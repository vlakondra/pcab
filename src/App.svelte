<script>
  //https://nerdcave.com/tailwind-cheat-sheet
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";

  let selected_comp;

  import Login from "./lib/comps/login.svelte";
  import Marks from "./lib/comps/marks.svelte";
  import Logout from "./lib/comps/logout.svelte";
  import Absence from "./lib/comps/absence.svelte";

  import { loginResult, accessToken } from "./lib/store.js";

  const select_comp = (comp) => {
    switch (comp) {
      case "login":
        if (!$accessToken) selected_comp = Login;
        break;
      case "marks":
        if ($accessToken) selected_comp = Marks;
        else selected_comp = Login;
        break;
      case "abs":
        if ($accessToken) selected_comp = Absence;
        else selected_comp = Login;
        break;
      default:
        selected_comp = undefined;
        break;
    }
  };
</script>

<main class="container mx-auto min-h-screen bg-slate-400">
  <div class="navbar sticky top-0 bg-base-100 bg-cyan-200 z-50">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <ul
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a href="#" on:click={() => select_comp("")}>Домой?</a></li>
          <li>
            <a href="#" on:click={() => select_comp("login")}>Вход</a>
          </li>
          <li>
            <a href="#" on:click={() => select_comp("marks")}>Успеваемость</a>
          </li>
          <li>
            <a href="#" on:click={() => select_comp("abs")}>Посещаемость</a>
          </li>
          <li>
            <a href="#" on:click={() => select_comp("mater")}>Материалы</a>
          </li>
        </ul>
      </div>
      <a href="" class="">
        <!-- иконка лич. каб. -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
          />
        </svg>
      </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a on:click={() => select_comp("")}>Домой</a></li>
        <li><a on:click={() => select_comp("login")}>Вход</a></li>
        <li><a on:click={() => select_comp("uspev")}>Успеваемость</a></li>
        <li><a on:click={() => select_comp("abs")}>Посещаемость</a></li>
        <li><a on:click={() => select_comp("mater")}>Материалы</a></li>

        <!-- <li>
          <a href="#">
            Parent
            <!-- <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              ><path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              /></svg
            > 
          </a>
          <ul class="p-2 bg-slate-50 z-50">
            <li><a href="/register">Регистрация</a></li>
            <li><a href="#" on:click={() => select_comp("login")}>Вход</a></li>
          </ul>
        </li> -->
      </ul>
    </div>
    <div class="flex-col navbar-end mr-6">
      <!-- flex-col - для устранения эффекта с верт. скроллингом -->
      <Logout toggle_login={select_comp} />
    </div>
  </div>

  <div>
    {#if selected_comp}
      <svelte:component this={selected_comp} toggle_login={select_comp} />
    {/if}
  </div>
</main>

<style>
</style>
