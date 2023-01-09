import { Link } from "react-router-dom"
import { useAddSuperHeroData, useReSuperHeroHook } from "../hooks/rqSuperHeroHook"
import { useState } from 'react'

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState(''); 

  const onSuccess = (data) =>{
    console.log("Perform side effect after data fetching" , data)
  }

  const onError = (error) => {
    console.log("Perform side effect after getting errr" , error)

  }
const {isLoading , data, isError , error , isFetching, refetch} = useReSuperHeroHook(onSuccess,onError)
const {mutate:addHero , isLoading:isHeroLoading} =  useAddSuperHeroData();
  
const handleAddHeroClick = () => {
  const heroObj = {name , alterEgo};
  addHero(heroObj)
}


if(isLoading || isFetching){
  return <h2>Loading...</h2>
}

if(isError){
  return <h2>{error.message}</h2>
}
  return <>
    <h2>
      RQ Super Heroes Page
    </h2>
    <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
       <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)}/>
       <button type="button" onClick={handleAddHeroClick}>Add Hero</button>
      </div>

    <button type="button" onClick={refetch}>Fetch Data</button>
    {
      data?.data.map((hero) =>{
        return <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
      })
    }
    {/* After transfor data */}
     {/* {
      data?.map((name) =>{
        return <div key={name}>{name}</div>
      })
    } */}
  </>
}
