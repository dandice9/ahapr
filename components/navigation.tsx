import { Component, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserProfile } from '@auth0/nextjs-auth0'

interface State {
  isStickyHeader: boolean,
  navbarToggler: HTMLButtonElement | null,
  navbarCollapse: HTMLElement | null
}

interface Props {
  user: UserProfile | undefined,
  isLoading: boolean
}

class Navigation extends Component<Props, State>{
  constructor(props: Props){
    super(props)

    this.state = {
      isStickyHeader: false,
      navbarToggler: null,
      navbarCollapse: null
    }
  }

  onScroll(){
    const { pageYOffset } = window;
    const udHeader = document.querySelector<HTMLDivElement>('.ud-header')
    const isStickyHeader = (udHeader ? (udHeader?.offsetTop) < pageYOffset : false)

    // on/off sticky header
    if(isStickyHeader !== this.state.isStickyHeader){
      this.setState(
        {
          isStickyHeader
        }
      )

      const backToTop = document.querySelector<HTMLSpanElement>(".back-to-top")
      if(backToTop)
        backToTop.style.display = (isStickyHeader ? 'flex' : 'none')
    }

    // on scroll set active/inactive
    const sections = document.querySelectorAll<HTMLLinkElement>(".ud-menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    sections.forEach(currLink => {
      const val = currLink.getAttribute("href")?.replace('/', '') ?? '#home';
      const refElement = document.querySelector<HTMLDivElement>(val);
      const scrollTopMinus = scrollPos + 73;
      const offsetRef = refElement?.offsetTop ?? 0
      const offsetHeight = refElement?.offsetHeight ?? 0

      if (
        offsetRef <= scrollTopMinus &&
        offsetRef + offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".ud-menu-scroll")?.classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    })
  }

  onShowMenuDropdown = () => {
    const { navbarToggler, navbarCollapse } = this.state
    navbarToggler?.classList.toggle("navbarTogglerActive");
    navbarCollapse?.classList.toggle("hidden");
  }

  componentDidMount(){
    window.addEventListener("scroll", this.onScroll.bind(this), { passive: true });

    const navbarToggler = document.querySelector<HTMLButtonElement>("#navbarToggler");
    const navbarCollapse = document.querySelector<HTMLElement>("#navbarCollapse");

    this.setState({
      navbarToggler, navbarCollapse
    }, () => {
      const { navbarToggler } = this.state
      // responsive menu show/hide
      navbarToggler?.addEventListener("click", this.onShowMenuDropdown);
      document.querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
      .forEach((e) =>
        e.addEventListener("click", () => {
          navbarToggler?.classList.remove("navbarTogglerActive");
          navbarCollapse?.classList.add("hidden");
        })
      );

      // scroll on click link
      const pageLink = document.querySelectorAll<HTMLLinkElement>(".ud-menu-scroll");
      pageLink.forEach((elem: HTMLLinkElement) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();
          const hrefEl = elem.getAttribute("href")?.replace('/', '')
          if(hrefEl)
          document.querySelector<HTMLLinkElement>(hrefEl)?.scrollIntoView({
            behavior: "smooth"
          });
        });
      });
    })
  
    const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    function scrollTo(element: HTMLElement, to = 0, duration = 500) {
      const start = element.scrollTop;
      const change = to - start;
      const increment = 20;
      let currentTime = 0;
  
      const animateScroll = () => {
        currentTime += increment;
  
        const val = easeInOutQuad(currentTime, start, change, duration);
  
        element.scrollTop = val;
  
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
  
      animateScroll();
    }

    const backToTop = document.querySelector<HTMLSpanElement>(".back-to-top")
  
    if(backToTop){
      backToTop.onclick = () => {
        scrollTo(document.documentElement);
      };
    }
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.onScroll.bind(this));
  }

  mainContainer(child: ReactNode): ReactNode{
    const { isStickyHeader } = this.state
    return (<div className={"ud-header top-0 left-0 z-40 flex w-full items-center bg-transparent" + (isStickyHeader ? ' sticky' : ' absolute')}>
      <div className='container mx-auto'>
      {child}
      </div>
    </div>)
  }

  render(): ReactNode {
    const { isStickyHeader } = this.state

      return this.mainContainer((
          <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link href="/">
              <a className="navbar-logo block w-full py-5">
                <Image width={157} height={56} src={isStickyHeader ? "/images/logo/logo.svg" : "/images/logo/logo-white.svg"} alt="logo" className="header-logo w-full" />
              </a>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button id="navbarToggler" className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-blue-500 focus:ring-2 lg:hidden">
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
              <nav id="navbarCollapse" className="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:px-4 lg:shadow-none xl:px-6 hidden">
                <ul className="blcok lg:flex">
                  <li className="group relative">
                    <Link href="/#home">
                      <a className={"ud-menu-scroll mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 active"}>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className={(!this.props.user ? "hidden " : "") + "group relative"}>
                    <Link href="/dashboard">
                      <a className="mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 active">
                        Dashboard
                      </a>
                    </Link>
                  </li>
                  <li className={(!this.props.user ? "hidden " : "") + "group relative"}>
                    <Link href="/profile">
                      <a className="mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-12">
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li className={(this.props.user ? "hidden " : "") + "group relative"}>
                    <a href="#about" className="ud-menu-scroll mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-12">
                      About
                    </a>
                  </li>
                  <li className={(this.props.user ? "hidden " : "") + "group relative"}>
                    <a href="#pricing" className="ud-menu-scroll mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-12">
                      Pricing
                    </a>
                  </li>
                  <li className={(this.props.user ? "hidden " : "") + "group relative"}>
                    <a href="#team" className="ud-menu-scroll mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-12">
                      Team
                    </a>
                  </li>
                  <li className={(this.props.user ? "hidden " : "") + "group relative"}>
                    <a href="#contact" className="ud-menu-scroll mx-8 flex py-2 text-base text-black group-hover:text-blue-500 lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-12">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {this.props.isLoading ? (<div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <span className='loginBtn logoutBtn py-3 px-7 text-base font-medium text-white hover:opacity-70'>Please wait...</span>
            </div>) : (this.props.user ? <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <Link href="/api/auth/logout">
                <a className="logoutBtn py-3 px-7 text-base font-medium text-white hover:opacity-70">
                  Sign Out
                </a>
              </Link>
            </div> : 
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <Link href="/api/auth/login">
                <a className="loginBtn py-3 px-7 text-base font-medium text-white hover:opacity-70">
                  Sign In
                </a>
              </Link>
              <Link href="/api/signup">
                <a className="signUpBtn rounded-lg bg-white bg-opacity-20 py-3 px-6 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-black">
                  Sign Up
                </a>
              </Link>
            </div>)}
          </div>
      </div>
      ))
  }
}

export default Navigation