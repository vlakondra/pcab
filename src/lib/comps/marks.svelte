<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    let data = new Promise(() => {}); //get_absence) ???
    let semesters = [];
    let selected_sem = 1;

    async function get_marks() {
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
    }

    onMount(get_marks);

    const formatMark = (mark) => {
        if (mark.includes("зач")) {
            return "zach";
        } else if (mark.includes("уд")) {
            return "udovl";
        } else if (mark.includes("хор")) {
            return "hor";
        } else if (mark.includes("отл")) {
            return "otl";
        } else if (mark.includes("н")) {
            return "abs";
        }
    };
</script>

<svelte:head>
    <title>Успеваемость</title>
</svelte:head>

<div class="bg-[#fff1dc;] box-content w-auto px-3 py-8 min-h-screen">
    {#await data}
        <p>Загрузка...</p>
    {:then value}
        <div>
            <h1
                class="sm:block mb-5 m-auto tracking-wider max-w-3xl text-lg text-center h-12 leading-[3rem] bg-[#7a7ade;] text-[#f5fbfb;] font-semibold"
            >
                Успеваемость. {selected_sem} семестр
            </h1>
            <div class="flex flex-col m-auto max-w-3xl sm:flex-row">
                <div
                    class="flex-grow-0 px-0 w-48 dropdown dropdown-hover sm:dropdown-open"
                >
                    <button
                        tabindex="0"
                        style=""
                        class="btn btn-info w-full btn:sm sm:hidden z-0 mb-2 min-h-6 h-8 p-0"
                    >
                        Выберите семестр
                    </button>

                    <ul
                        tabindex="0"
                        class="w-full z-0 dropdown-content menu text-lg border-[1px] border-solid border-indigo-300 p-2 shadow bg-[#f7ffff;]"
                    >
                        {#each semesters as item}
                            <li
                                class:active={selected_sem === item}
                                on:keydown={null}
                                class="cursor-pointer hover:bg-red-400 hover:text-cyan-200 px-1 my-1 whitespace-nowrap"
                                on:click={() => (selected_sem = item)}
                            >
                                {item} семестр
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="flex-grow px-1">
                    {#each value.filter((obj) => obj.Sem == selected_sem) as item}
                        <div
                            class=" border-indigo-200 border-b-2 min-w-[300px] grid grid-rows-[minmax(0,1fr)_auto] grid-cols-[3fr_125px] items-start gap-x-0 gap-y-0 leading-none mb-1 decoration-slate-900 bg-base-100 mark-item"
                        >
                            <div class="subj text-gray-500">
                                {item.SubjSN}
                            </div>
                            <div class="fio">
                                {item.EmpFIO}
                            </div>
                            <div class=" load-mark">
                                <span class="loadkindsn"
                                    >{item.LoadKindSN}:</span
                                >
                                <span class={"mark " + formatMark(item.MarkSN)}>
                                    {item.MarkSN}</span
                                >
                            </div>
                            <div class="date-mark">
                                {new Date(item.DateMark).toLocaleDateString()}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/await}
</div>

<style>
    .loadkindsn {
        display: inline-block;
        width: 65px;
    }

    .active {
        background-color: rgb(168, 94, 237);
        color: azure;
    }

    .mark-item div {
        padding: 2px 5px;
        color: #7e6363;
    }
    .subj {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        font-weight: 500;
        /* color: #7e6363; */
    }
    .fio {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    .load-mark {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        white-space: nowrap;
    }
    .date-mark {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }

    .mark {
        color: white;
        line-height: 1rem;
        display: inline-block;
        height: 18px;
        width: -moz-fit-content;
        width: fit-content;
        border-radius: 4px;
        padding: 0 1px;
        font-size: 0.75rem;
    }
    .zach {
        background-color: #6a5cf1;
    }
    .udovl {
        background-color: #4f4f63;
    }
    .otl {
        background-color: #f29408;
    }
    .hor {
        background-color: rgb(107 217 107);
    }
    .abs {
        background-color: rgb(2, 2, 156);
    }
</style>
