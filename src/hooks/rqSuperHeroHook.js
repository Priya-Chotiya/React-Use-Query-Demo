import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"

const fetchData = () =>{
  return axios.get('http://localhost:4000/superheroes')
}

const fetchHeroDetails = (id) =>{
    return axios.get(`http://localhost:4000/superheroes/${id}`)
}

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes' , hero)
}

export const useReSuperHeroHook = (onSuccess ,onError) =>{
    return useQuery('super-heroes' , fetchData, {
        cacheTime:5000,
        staleTime:30000,
        enabled:false,
        onSuccess,
        onError,
        // refetchOnMount:true or false
        // refetchOnWindowFocus:true/false
        // refetchInterval:2000
        // select:(data) =>{
        //   // transform data here
        //   const getName = data.data.map((e) => e.name);
        //   return getName
        // }
      
      })
      
}

export const useReSuperHeroHookDetail = (heroId) =>{
  const queryClient = useQueryClient()
    return useQuery(['super-hero' , heroId] , () => fetchHeroDetails(heroId) , {
      //  we can apply initial data as well when api taking much time
      initialData:() =>{
        const hero =  queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))
        if(hero){
          return {
            data:hero
          }
        }else{
          return undefined
        }
      }
    })
}

export const useAddSuperHeroData = () =>{
  const queryClient = useQueryClient()
  return useMutation(addSuperHero , {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('super-heroes');
      queryClient.setQueryData('super-heroes' , (oldQueryData) =>{
        return{
          ...oldQueryData,
          data:[...oldQueryData.data, data.data]
        }
      })
    }
  })
}