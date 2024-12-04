import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./categorie.css";

const Editcategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({
    nomcategorie: "",
    imagecategorie: "",
  });

  // Charger les données de la catégorie à modifier
  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/categories/${id}`);
        setCategorie(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchCategorie();
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/categories/${id}`, categorie);
      navigate("/categories");
    } catch (error) {
      alert("Erreur lors de la mise à jour !");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Modifier Catégorie</h2>
        <div className="form-group">
          <label htmlFor="nomcategorie">Nom catégorie</label>
          <input
            type="text"
            id="nomcategorie"
            value={categorie.nomcategorie}
            onChange={(e) =>
              setCategorie({ ...categorie, nomcategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez le nom de la catégorie"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagecategorie">Image</label>
          <input
            type="text"
            id="imagecategorie"
            value={categorie.imagecategorie}
            onChange={(e) =>
              setCategorie({ ...categorie, imagecategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez l'URL de l'image"
          />
        </div>
        <button
          type="button"
          className="form-submit-button"
          onClick={handleSubmit}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Editcategorie;
