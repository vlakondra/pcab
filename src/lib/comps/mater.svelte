<script>
    import { onMount } from "svelte";
    import { accessToken } from "../store";

    import Fa from "svelte-fa";
    import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

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
        data = await res.json();
        current_subj = data.Subj[0];
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

<div class="bg-[#fff1dc;] box-content w-auto px-3 py-8 min-h-screen">
    <div>
        {#await data}
            <p>Загрузка...M</p>
        {:then value}
            <div>
                <h1
                    class="sm:block mb-5 m-auto tracking-wider text-lg text-center h-12 leading-[3rem] bg-[#7a7ade;] text-[#f5fbfb;] font-semibold"
                >
                    Учебные материалы
                    <a class="absolute top-[-999px]" bind:this={link} />
                </h1>
                <div class="flex flex-col m-auto sm:flex-row">
                    <div
                        class="flex-grow-0 px-0 w-[300px] dropdown dropdown-hover sm:dropdown-open"
                    >
                        <button
                            tabindex="0"
                            style=""
                            class="btn btn-info w-full btn:sm sm:hidden z-0 mb-2 min-h-6 h-8 p-0"
                        >
                            Выберите раздел
                        </button>
                        <!-- cursor-pointer text-gray-700 leading-4 pt-1 pb-1 hover:bg-green-700 hover:text-cyan-200 px-1 my-1 -->
                        <ul
                            tabindex="0"
                            class="w-full min-w-[300px] z-0 dropdown-content menu p-2 shadow text-lg border-[1px] border-solid border-indigo-300 shadow bg-[#f7ffff;]"
                        >
                            {#each data.Subj as item}
                                <li
                                    class:active={selected_subj ===
                                        item.Subj_ID}
                                    on:keydown={null}
                                    class="cursor-pointer text-gray-700 leading-4 pt-1 pb-1 hover:bg-red-400 hover:text-cyan-200 px-1 my-1"
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

                    <div
                        class="px-1"
                        style="flex-grow: 1;flex-basis: min-content;"
                    >
                        <ul>
                            {#each current_subj.Files as item}
                                <li
                                    class="cursor-pointer hover:bg-green-500 hover:text-cyan-50 text-lg bg-[#f6ffff;] leading-4 mb-3 px-1 py-2"
                                    on:click={() => download(item)}
                                >
                                    <div
                                        style="display:flex; justify-content: space-between; align-items: center;"
                                    >
                                        <div>
                                            {item.DocRef}
                                        </div>
                                        <div
                                            style="font-size: 1.5em; color: #ba5efd;"
                                        >
                                            <Fa icon={faFileDownload} />
                                        </div>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
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
