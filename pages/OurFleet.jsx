import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/movies/")
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}

const OurFleet = ({data}) => {
  return (
    <div>
      <div>Our Fleet</div>
      {
        data.map((item) => {
          return (
            <div key={item.id}>
              <Link href={`/blog/${item.id}`}><h1>{item.id}</h1></Link>
              <h1>{item.title}</h1>
              <h1>{item.body}</h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default OurFleet