'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar, DarkThemeToggle } from 'flowbite-react';

export default function Component() {
  return (
    <Navbar fluid>
      <Navbar.Brand as={Link} href="/">
        <Image src="/cat.webp" width={24} height={24} alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white pl-2">A 3IQ Hacks Creation</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
}