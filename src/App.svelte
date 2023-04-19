<script>
  //https://nerdcave.com/tailwind-cheat-sheet
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";

  import {
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    FooterLink,
  } from "flowbite-svelte";

  import Login from "./lib/comps/login.svelte";
</script>

<main class="container sm:mx-auto px-1">
  <Navbar let:hidden let:toggle>
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
      <NavLi href="/about">Вход</NavLi>
      <NavLi href="/services">Успеваемость</NavLi>
      <NavLi href="/pricing">Посещаемость</NavLi>
      <NavLi href="/contact">Материалы</NavLi>
    </NavUl>
  </Navbar>

  <div>
    <Login />
  </div>

  <Footer
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
  </Footer>
</main>

<style>
  .container {
    background-color: rgb(115, 155, 194);
    min-height: 100vh;
  }
</style>
