import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Affichecategories = ({ categories, setCategories }) => {
  const navigate = useNavigate();

  // Fonction pour supprimer une catégorie
  const deleteCategorie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/categories/${id}`);
      console.log('Category successfully deleted!');
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Configuration des colonnes du tableau
  const columns = useMemo(
    () => [
      {
        accessorKey: 'imagecategorie',
        header: 'Image',
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              alt="Category"
              width={200}
              height={80}
              src={cell.getValue()}
              loading="lazy"
              style={{ borderRadius: '5%' }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'nomcategorie',
        header: 'Nom Catégorie',
        size: 100,
      },
      {
        accessorKey: '_id',
        header: 'Actions',
        size: 10,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
            <Button
              onClick={() => navigate(`/categories/edit/${row.original._id}`)}
              variant="contained"
              color="warning"
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              onClick={() => deleteCategorie(row.original._id)}
              variant="contained"
              color="error"
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        ),
      },
    ],
    [categories, navigate]
  );

  return (
    <div className="container">
      {categories && categories.length > 0 && (
        <MaterialReactTable columns={columns} data={categories} />
      )}
    </div>
  );
};

export default Affichecategories;
