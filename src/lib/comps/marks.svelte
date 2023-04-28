<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    let data = new Promise(() => {}); //get_absence) ???
    let semesters = [];
    let selected_sem = 1;

    async function get_absence() {
        let url = "https://api-1.ursei.su/studlk/StudMark";
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${$accessToken}`,
            },
        });
        console.log(res);
        let all_data = await res.json();
        //semesters = [...new Set(data.Marks.map((obj) => obj.Sem))];

        data = await all_data.Marks.filter(
            (obj) => obj.LoadKindSN == "Зачет" || obj.LoadKindSN == "Экзамен"
        );
        semesters = [...new Set(data.map((obj) => obj.Sem))];

        console.log(semesters);
        console.log(data); // stud_marks);
    }

    onMount(get_absence);
</script>

<svelte:head>
    <title>Успеваемость</title>
</svelte:head>

<div
    style="min-height: 400px;"
    class="bg-slate-100 box-content w-auto px-8 py-8"
>
    <h1 class="text-center">Успеваемость. {selected_sem} семестр</h1>

    {#await data}
        <p>Загрузка...</p>
    {:then value}
        <div class="flex flex-col sm:flex-row">
            <div class="flex-grow-0 px-4 my-0 w-40 dropdown dropdown-hover">
                <label
                    tabindex="0"
                    class="btn btn-ghost glass w-32 btn:sm ms-0 py-1.5"
                    >Выберите семестр</label
                >
                <ul
                    style="width:165px"
                    tabindex="0"
                    class="dropdown-content menu w-44 p-2 shadow bg-base-100"
                >
                    {#each semesters as item}
                        <li
                            class:active={selected_sem === item}
                            on:keydown={null}
                            class="cursor-pointer px-1 w-44 whitespace-nowrap"
                            on:click={() => (selected_sem = item)}
                        >
                            {item} семестр
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="flex-grow px-2">
                {#each value.filter((obj) => obj.Sem == selected_sem) as item}
                    <div
                        class="border-b-2 border-blue-400 grid grid-rows-[minmax(0,1fr)_auto] grid-cols-[3fr_1.5fr] items-start gap-x-1 gap-y-0 leading-none mb-1 decoration-slate-900 bg-slate-50 mark-item"
                    >
                        <div class="subj">
                            {item.SubjSN}
                        </div>
                        <div class="fio">
                            {item.EmpFIO}
                        </div>
                        <div class=" load-mark">
                            {item.LoadKindSN}: {item.MarkSN}
                            <!-- <span>{item.LoadKindSN}:</span>
                            <span>{item.MarkSN}</span> -->
                        </div>
                        <div class="date-mark">
                            {new Date(item.DateMark).toLocaleDateString()}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/await}
</div>

<style>
    .active {
        background-color: rgb(168, 94, 237);
        color: azure;
    }
    .mark-item {
        /* display: grid; */
        /* grid-gap: 2px; */
        /* row-gap: 1px;
        column-gap: 5px; */
        /* grid-template-columns: 75% 25%; */
        /* grid-template-columns: 3fr 1fr; */
        /* grid-template-rows: auto auto; */

        /* line-height: 1; */
        /* margin-bottom: 5px; */
        /* background-color: #fdfdfd;
        color: rgb(53, 30, 30); */
    }
    .mark-item div {
        padding: 5px;
    }
    .subj {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .fio {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    .load-mark {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }
    .date-mark {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
</style>
