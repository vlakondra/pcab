<script>
    import { infoToken, loginResult, accessToken } from "../store.js";
    import Modal from "./modal.svelte";
    import { modal_show } from "../store.js";

    const close_cab = () => {
        loginResult.set(null);
        accessToken.set(null);
        infoToken.set(null);
        toggle_login("");
    };

    export let toggle_login;
</script>

<!-- on:click={close_cab}
    on:keypress={null} -->

<div
    on:click={() => {
        $modal_show = true;
    }}
    on:keydown={null}
    class="flex tooltip tooltip-info tooltip-bottom cursor-pointer"
    data-tip="Закрыть кабинет"
>
    {#if $infoToken}
        {$infoToken}
    {/if}
</div>

<Modal {close_cab} />
