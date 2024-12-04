import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Listarticles = () => {
  const[articles,setArticles]=useState([])
const fetcharticles=async()=>{
  await axios.get("http://localhost:3001/api/articles")
  .then(res=>{
    setArticles(res.data)
   
  }).catch(error=>{
    console.log(error)
  })
}
useEffect(()=>{
  fetcharticles()
})
  return (
    <div>
      <h1>Liste des articles</h1>
     <Link to="/articles/add"><button className="btn btn-success btn-sm"><i class="fa-solid fa-circle-plus"></i>  Ajouter</button></Link> 
      <table className="table table striped">
        <thead>
        <tr>
          <th>RÃ©fÃ©rence</th>
          <th>DÃ©signation</th>
          <th>Marque</th>
          <th>Prix</th>
          <th>Image</th>
          <th>Stock</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {
            articles.map((art,index)=>
            <tr key={index}>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.prix}</td>
                <td><img src={art.imageart} width={100}height={100}/></td>
                <td>{art.qtestock}</td>
                <td><button className="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                <td><button className="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
            )

          }
        </tbody>
      </table>
      <button onClick={()=>fetcharticles()}>Afficher</button>
    </div>
  )
}

export default Listarticles
