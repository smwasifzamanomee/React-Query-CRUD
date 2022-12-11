import Link from "next/link"

const Errorpage = () => {
  return (
    <>
        <h1 className="text-3xl text-center pt-16">404</h1>
        <p className="text-center">We are sorry, page not found</p>

        <Link className="text-xl" href="/main">back to main page</Link>
    </>
  )
}

export default Errorpage