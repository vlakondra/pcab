<script>
  //https://nerdcave.com/tailwind-cheat-sheet
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  import Ursei from "./assets/ursei_pict.png";

  let selected_comp;

  import Login from "./lib/comps/login.svelte";
  import Marks from "./lib/comps/marks.svelte";
  import Logout from "./lib/comps/logout.svelte";
  import Absence from "./lib/comps/absence.svelte";
  import Mater from "./lib/comps/mater.svelte";

  import { loginResult, accessToken } from "./lib/store.js";

  import Fa from "svelte-fa";
  import { faBars } from "@fortawesome/free-solid-svg-icons";

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
      case "mater":
        if ($accessToken) selected_comp = Mater;
        else selected_comp = Login;
        break;

      default:
        selected_comp = undefined;
        break;
    }
  };
</script>

<main class="container mx-auto min-h-screen bg-slate-400">
  <div class="navbar sticky top-0 bg-cyan-100 z-[999]">
    <div class="navbar-start">
      <a href="https://ursei.su/">
        <img src={Ursei} />
      </a>

      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden text-lg">
          <Fa icon={faBars} />
        </label>
        <ul
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <!-- <li><a href="#" on:click={() => select_comp("")}>Домой?</a></li> -->
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

      <!-- <a href="" class="">
        <img src={Ursei} />
      </a> -->
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-lg">
        <!-- <li><a on:click={() => select_comp("")}>Домой</a></li> -->
        <li><a on:click={() => select_comp("login")}>Вход</a></li>
        <li><a on:click={() => select_comp("marks")}>Успеваемость</a></li>
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
