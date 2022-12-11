import {useQuery} from 'react-query';

const res = async () => await (await fetch('https://jsonplaceholder.typicode.com/users')).json();

const Services = () => {
  const {data, isLoading, isFetching} = useQuery('data', res);

  if(isLoading) return <div>Loading...</div>
  // console.log(data);
  return (
    <div>
      {
        data.map((item) => {
          return (
            <div key={item.id}>
                <p>{item.name}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Services