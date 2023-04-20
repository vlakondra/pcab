<script>
    import { infoToken, loginResult, accessToken } from "../store.js";

    const close_cab = () => {
        loginResult.set(null);
        accessToken.set(null);
        infoToken.set(null);
        toggle_login("");
    };

    export let toggle_login;
</script>

<div
    on:click={close_cab}
    on:keypress={null}
    class="tooltip tooltip-info tooltip-bottom cursor-pointer"
    data-tip="Закрыть кабинет"
>
    {#if $infoToken}
        {$infoToken}
    {/if}
</div>
