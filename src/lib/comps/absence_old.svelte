<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    let data = new Promise(() => {});
    let semesters = [];
    let selected_sem = 1;

    async function get_absence() {
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
    }

    onMount(get_absence);
</script>

<svelte:head>
    <title>Посещаемость</title>
</svelte:head>

<div
    style="min-height: 400px;"
    class="bg-amber-100 box-content w-auto px-8 py-8"
>
    <h1 class="text-center">Посещаемость</h1>
    {#await data}
        <p>Загрузка...</p>
    {:then value}
        <div class="flex flex-row">
            <div class="px-4 my-10">
                <ul>
                    {#each semesters as item}
                        <li
                            class:active={selected_sem === item}
                            on:keydown={null}
                            class="cursor-pointer px-1"
                            on:click={() => (selected_sem = item)}
                        >
                            {item} семестр
                        </li>
                    {/each}
                </ul>
            </div>
            <div class="px-2">
                <table class="table table-compact w-full">
                    <tr>
                        <th>Предмет </th>
                        <th>План (час.)</th>
                        <th>Пропуски (час.) </th>
                    </tr>
                    <tbody>
                        {#each value.Visits.filter((obj) => obj.Sem == selected_sem) as item}
                            <tr class="hover">
                                <td>
                                    {item.SubjSN}
                                </td>
                                <td>
                                    {item.SumH}
                                </td>
                                <td>
                                    {item.AbsH}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
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
