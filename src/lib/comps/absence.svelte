<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    let data = new Promise(() => {}); //get_absence) ???
    let semesters = [];
    let selected_sem = 1;

    async function get_abs() {
        let url = "https://api-1.ursei.su/studlk/StudVisits";
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
        data = await res.json();
        semesters = [...new Set(data.Visits.map((obj) => obj.Sem))];

        console.log(semesters);
        console.log(data); // stud_marks);
    }

    onMount(get_abs);
</script>

<svelte:head>
    <title>Посещаемость</title>
</svelte:head>

<div
    style="min-height: 400px;"
    class="bg-slate-100 box-content w-auto px-3 py-8"
>
    {#await data}
        <p>Загрузка...</p>
    {:then value}
        <h1 class="sm:block mb-5 tracking-wider text-lg text-center">
            Посещаемость. {selected_sem} семестр
        </h1>
        <div class="flex flex-col m-auto max-w-3xl sm:flex-row">
            <div
                class="flex-grow-0 px-0 w-48 dropdown dropdown-hover sm:dropdown-open"
            >
                <button
                    tabindex="0"
                    style=""
                    class="btn btn-info w-full btn:sm sm:hidden z-0 mb-2 min-h-6 h-4 p-0"
                >
                    Выберите семестр
                </button>

                <ul
                    tabindex="0"
                    class="w-full z-0 dropdown-content menu p-2 shadow bg-cyan-200"
                >
                    {#each semesters as item}
                        <li
                            class:active={selected_sem === item}
                            on:keydown={null}
                            class="cursor-pointer hover:border border-indigo-600 px-1 my-1 whitespace-nowrap"
                            on:click={() => (selected_sem = item)}
                        >
                            {item} семестр
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="flex-grow px-1">
                <div
                    class="  grid grid-rows-[minmax(0,1fr)_auto] grid-cols-[1fr_1fr] sm:grid-cols-[1fr_0.5fr_0.5fr] items-start gap-x-1 gap-y-0 border-indigo-200 border-b-2 leading-none mb-1 decoration-slate-900 bg-base-100 mark-item"
                >
                    <div
                        class="font-medium col-start-1 col-span-2 row-start-1 row-end-2"
                    >
                        Предмет
                    </div>
                    <div
                        class="font-medium col-start-1 col-end-2 row-start-2 row-end-3 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2"
                    >
                        План (час.)
                    </div>
                    <div
                        class="font-medium col-start-2 col-end-3 row-start-2 row-end-3 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2"
                    >
                        Пропуски (час.)
                    </div>
                </div>
                {#each value.Visits.filter((obj) => obj.Sem == selected_sem) as item}
                    <div
                        class="grid grid-rows-[minmax(0,1fr)_auto] grid-cols-[1fr_1fr] sm:grid-cols-[1fr_0.5fr_0.5fr] items-start gap-x-1 gap-y-0 border-indigo-200 border-b-2 leading-none mb-1 decoration-slate-900 bg-base-100 mark-item"
                    >
                        <div
                            class="p-1 font-medium text-gray-500 col-start-1 col-span-2 row-start-1 row-end-2 sm:col-start-1 sm:col-end-2"
                        >
                            {item.SubjSN}
                        </div>
                        <div
                            class="p-1 text-gray-500 col-start-1 col-end-2 row-start-2 row-end-3 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2"
                        >
                            {item.SumH}
                        </div>
                        <div
                            class="p-1 text-gray-500 col-start-2 col-end-3 row-start-2 row-end-3 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2"
                        >
                            {item.AbsH}
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
</style>
