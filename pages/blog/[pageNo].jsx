import { useRouter } from "next/router"

//getStaticPaths 
export const getStaticPaths = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/movies/")
    const data = await res.json();

    const paths = data.map((item) => {
        return{
            params: {
                pageNo: item.id.toString(),
            }
        }
    })
    return {
       paths,
       fallback: false,
    }
}
//getStaticProps
export const getStaticProps = async (context) => {
    const id = context.params.pageNo
    const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`)
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

const pageNo = ({data}) => {
    // console.log(data);
    const router = useRouter()
    const pageNumber = router.query.pageNo // dinamic route
    return (
        <div>
            <p>{data.id}</p>
            <p>{data.title}</p>
            <p>{data.body}</p>
        </div>
    )
}

export default pageNo