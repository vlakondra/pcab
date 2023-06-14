<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    let selected_subj = 0;
    let current_subj = {};
    let link;

    let data = new Promise(() => {});

    async function get_mater() {
        let url = "https://api-1.ursei.su/studlk/GetListMFiles";
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
        current_subj = data.Subj[0];
        console.log(data);
    }

    //https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
    const download = (file) => {
        var url = `https://api-1.ursei.su/studlk/GetMFile?doc=${file.Doc_ID}`;
        const response = fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${$accessToken}`,
            },
        });

        response.then((resp) => {
            resp.blob().then((blob) => {
                let url = window.URL.createObjectURL(blob);
                link.href = url;
                link.download = `${file.DocRef}${file.FileExt}`; //   "fname";
                link.click();
            });
        });
    };

    onMount(get_mater);
</script>

<svelte:head>
    <title>Учебные материалы</title>
</svelte:head>

<div class="bg-slate-100 box-content w-auto px-3 py-8 min-h-screen">
    <div>
        {#await data}
            <p>Загрузка...M</p>
        {:then value}
            <h1 class="sm:block mb-5 tracking-wider text-lg text-center">
                Учебные материалы
                <a class="absolute top-[-999px]" bind:this={link} />
            </h1>
            <div class="flex flex-col m-auto max-w-3xl sm:flex-row">
                <div
                    class="flex-grow-0 px-0 w-80 dropdown dropdown-hover sm:dropdown-open"
                >
                    <button
                        tabindex="0"
                        style=""
                        class="btn btn-info w-full btn:sm sm:hidden z-0 mb-2 min-h-6 h-4 p-0"
                    >
                        Выберите раздел
                    </button>

                    <ul
                        tabindex="0"
                        class="w-full min-w-[310px] z-0 dropdown-content menu p-2 shadow bg-cyan-200"
                    >
                        {#each data.Subj as item}
                            <li
                                class:active={selected_subj === item.Subj_ID}
                                on:keydown={null}
                                class="cursor-pointer text-gray-700 leading-4 pt-1 pb-1 hover:bg-green-700 hover:text-cyan-200 px-1 my-1"
                                on:click={() => {
                                    selected_subj = item.Subj_ID;
                                    current_subj = item;
                                }}
                            >
                                {item.SubjName}
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="flex-grow px-1">
                    <ul>
                        {#each current_subj.Files as item}
                            <li on:click={() => download(item)}>
                                {item.DocRef}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        {/await}
    </div>
</div>

<style>
    .my-elips {
        /* max-width: 320px; */
        word-break: break-word;
        /* text-overflow: ellipsis; */
        line-height: 15px;
        padding: 3px;
        overflow: hidden;
        white-space: nowrap;
    }

    .active {
        background-color: rgb(168, 94, 237);
        color: azure;
    }
</style>
