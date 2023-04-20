<script>
    import {
        useForm,
        Hint,
        HintGroup,
        validators,
        minLength,
        email,
        required,
    } from "svelte-use-form";

    import Auth, { loginResult } from "../store.js";

    const form = useForm();
    export let toggle_login;

    $: if ($loginResult == true) {
        //срабатывает после успешного входа
        $loginResult = null;
        toggle_login("");
    }

    async function submitHandler() {
        try {
            const data = new URLSearchParams();
            const clientId = "studentlk";
            const clientSecret = "studentlk";
            const scopes = "basic studentlk";
            data.append("grant_type", "password");
            data.append("client_id", clientId);
            data.append("client_secret", clientSecret);
            data.append("scope", scopes);
            data.append("username", $form.email.value);
            data.append("password", $form.password.value);

            await Auth(data);
            loginResult.set(null);
            console.log("data", data.get("username"));
        } catch (error) {
            console.log("EE", error.message);
        }
    }
</script>

<div
    class="w-full max-w-xs p-4 mx-auto my-5 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
>
    <form on:submit|preventDefault={submitHandler} class="space-y-6" use:form>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Вход в личный кабинет
        </h5>
        {#if $loginResult == false}
            <div
                class="font-medium text-red-600 text-sm border-b border-x-blue-800"
            >
                Вход в личный кабинет не выполнен
            </div>
        {/if}

        <div>
            <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
            >
            <input
                type="email"
                name="email"
                id="email"
                value="someone@some.host"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="someone@some.host"
                use:validators={[email, required]}
            />
            <HintGroup for="email">
                <Hint for="email" on="email" let:value hideWhenRequired
                    >Email введен c с ошибками</Hint
                >
                <Hint for="email" on="required" let:value>Email не введен</Hint>
            </HintGroup>
        </div>
        <div>
            <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Пароль</label
            >
            <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                use:validators={[required]}
            />
            <Hint for="password" on="required" let:value
                >Введите, пожалуйста, пароль</Hint
            >
        </div>
        <div class="flex justify-end">
            <!-- <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                    />
                </div>
                <label
                    for="remember"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Remember me</label
                >
            </div> -->

            <div class="tooltip tooltip-info" data-tip="Обратитесь в деканат">
                <a
                    id="lostpwd"
                    href="#"
                    class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >Забыли пароль?</a
                >
            </div>
        </div>
        <div class="flex justify-between flex-row-reverse">
            {#if $form.valid}
                <button type="submit" class="w-2/5 btn-sm btn-info rounded-xl"
                    >Войти</button
                >
            {:else}
                <button
                    class="w-2/5 btn-sm btn-info btn-disabled cursor-not-allowed rounded-xl"
                    disabled>Войти</button
                >
            {/if}
            <button
                on:click={(e) => {
                    e.preventDefault();
                    $loginResult = null;
                    toggle_login("");
                }}
                class="w-2/5 btn-sm btn-info rounded-xl">Отмена</button
            >
        </div>
        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a
                href="#"
                class="text-blue-700 hover:underline dark:text-blue-500"
                >Create account</a
            >
        </div> -->
        <!-- </div> -->
    </form>
</div>

<style>
    :global(.svelte-use-form-hint) {
        color: red;
        font-size: 0.8rem;
        font-weight: 600;
    }
</style>
