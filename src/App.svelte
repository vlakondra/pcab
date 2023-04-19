<script>
  //https://nerdcave.com/tailwind-cheat-sheet
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  // import {
  //   Navbar,
  //   NavBrand,
  //   NavLi,
  //   NavUl,
  //   NavHamburger,
  // } from "flowbite-svelte";

  // import {
  //   Footer,
  //   FooterCopyright,
  //   FooterLinkGroup,
  //   FooterLink,
  // } from "flowbite-svelte";

  let selected_comp;

  import Login from "./lib/comps/login.svelte";
  import Uspev from "./lib/comps/uspev.svelte";
  // import NavBar from "./lib/comps/navbar.svelte";

  const select_comp = (comp) => {
    switch (comp) {
      case "login":
        selected_comp = Login;
        break;
      case "uspev":
        selected_comp = Uspev;
        break;
      default:
        break;
    }

    //  if (comp == "login") {
    //   selected_comp = Login;
    //   console.log(comp);
    // } else if (comp == "uspev") {
    //   selected_comp = Uspev;
    // }
  };
</script>

<main class="container sm:mx-auto px-1">
  <div class="navbar sticky top-0 bg-base-100 z-50">
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
          <li><a href="/">home</a></li>
          <li>
            <a href="" class="justify-between">
              Parent
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                ><path
                  d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                /></svg
              >
            </a>
            <ul class="p-2 bg-white">
              <li><a href="/register">Регистрация</a></li>
              <li><a href="/login">Вход</a></li>
            </ul>
          </li>
          <li>
            <a href="/login">Вход</a>
            <!-- наивная защита маршрута -->
            <!-- {#if data.session?.user?.name}
							<a href="/quiz/0">Quiz</a>
						{:else}
							<a href="/login">Вход</a>
						{/if} -->
          </li>
        </ul>
      </div>
      <a href="" class="btn btn-ghost normal-case text-xl"> daisyUI </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Home</a></li>
        <li>
          <a href="#">
            Parent
            <svg
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
        </li>
        <!-- <li><a href="/quiz/0">Quiz</a></li> -->
        <li>
          <a href="#">Вход</a>
          <!-- {#if data.session?.user?.name}
						<a href="/quiz/0">Quiz</a>
					{:else}
						<a href="/login">Вход</a>
					{/if} -->
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      END
      <!-- {#if data.session.user}
				<form action="/bye">
					<button>Привет, {data.session.user.name}</button>
				</form>
			{:else}
				<a class="btn">Get started</a>
			{/if} -->
    </div>
  </div>

  <!-- <Navbar let:hidden let:toggle>
    <NavBrand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        Личный кабинет
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="/" active={true}>Home</NavLi>
      <NavLi on:click={() => select_comp("login")}>{hidden}Вход</NavLi>
      <NavLi on:click={() => select_comp("uspev")}>Успеваемость</NavLi>
      <NavLi href="/pricing">Посещаемость</NavLi>
      <NavLi href="/contact">Материалы</NavLi>
    </NavUl>
  </Navbar> -->

  <!-- <NavBar /> -->

  <div>
    <svelte:component this={selected_comp} />
  </div>

  <!-- <Footer
    class="sticky top-full bottom-0 left-0 z-20  p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 "
  >
    <FooterCopyright href="/" by="Flowbite™" year={2022} />
    <FooterLinkGroup
      ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
    >
      <FooterLink href="/">About</FooterLink>
      <FooterLink href="/">Privacy Policy</FooterLink>
      <FooterLink href="/">Licensing</FooterLink>
      <FooterLink href="/">Contact</FooterLink>
    </FooterLinkGroup>
  </Footer> -->
</main>

<style>
  .container {
    background-color: rgb(115, 155, 194);
    min-height: 100vh;
  }
</style>
