<script>
    import { modal_show } from "../store.js";
    export let close_cab;
</script>

<div class="modal {$modal_show ? 'modal-open' : ''}">
    <div class="modal-box">
        <!-- <h3 class="text-lg font-bold">Hello!</h3> -->
        <p class="text-lg text-indigo-600 py-4">
            Вы хотите закрыть личный кабинет?
        </p>

        <div style="display: flex; justify-content: end;" class="mt-8">
            <button
                type="button"
                class="btn-sm btn-info mr-4 w-24"
                on:click={(e) => {
                    close_cab();
                    $modal_show = false;
                }}>Закрыть</button
            >
            <button
                type="button"
                class="btn-sm btn-info w-24"
                on:click={() => {
                    $modal_show = false;
                }}>Выйти</button
            >
        </div>
    </div>
</div>
