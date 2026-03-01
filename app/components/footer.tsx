export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            rel="noopener noreferrer me"
            target="_blank"
            href="https://github.com/manojbajaj95"
          >
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            rel="noopener noreferrer me"
            target="_blank"
            href="https://linkedin.com/in/manojbajaj95"
          >
            <p className="ml-2 h-7">linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            rel="noopener noreferrer me"
            target="_blank"
            href="https://twitter.com/senor_bajaj"
          >
            <p className="ml-2 h-7">twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            href="mailto:manoj@ruzo.ai"
          >
            <p className="ml-2 h-7">email</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} Manoj Bajaj
      </p>
    </footer>
  )
}
