//TODO: Refactoring to use custom dialog
import { useState } from "react";
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import crocoImage from "../../assets/croc.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth.ts";

const products = [
  { name: "Analytics", description: "Get a better understanding of your traffic" },
  { name: "Engagement", description: "Speak directly to your customers", href: "#" },
  { name: "Security", description: "Your customers’ data will be safe and secure", href: "#" },
  { name: "Integrations", description: "Connect with third-party tools", href: "#" },
  { name: "Automations", description: "Build strategic funnels that will convert", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDesktopClick = () => {
    setDesktopMenuOpen(!desktopMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-custom-green">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
          <img alt="croc.png" src={crocoImage} className="h-8 w-auto" onClick={() => navigate("/home")} />
          <a href="#" className="-m-1.5 p-1.5"></a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button className="flex items-center gap-x-1 text-sm/6 font-semibold" onClick={handleDesktopClick}>
              Product
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
            </button>
            <div className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
              {desktopMenuOpen && (
                <>
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {/*callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold hover:bg-gray-100"
                      >
                        <item.icon aria-hidden="true" className="size-5 flex-none" />
                        {item.name}
                      </a>
                    ))*/}
                  </div>
                </>
              )}
            </div>
          </div>

          <a href="#" className="text-sm/6 font-semibold">
            Features
          </a>
          <a href="#" className="text-sm/6 font-semibold">
            Marketplace
          </a>
          <a href="#" className="text-sm/6 font-semibold">
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a onClick={handleLogout} href="#" className="text-sm/6 font-semibold">
            Logout <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6 text-black" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180 text-black"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {/*[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))*/}
                  </DisclosurePanel>
                </Disclosure>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50">
                  Features
                </a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50">
                  Marketplace
                </a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50">
                  Company
                </a>
              </div>
              <div className="py-6">
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
