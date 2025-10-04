import { TextField } from '@mui/material';
import React, { useState } from 'react'

const AddProductForm = ({onSave,onCancel}) => {
  const [form,setForm] = useState({
    name:"",
    gst:"",
    sizeType:"",
    price:"",
    description:"",
    image:"",
  });

  const handleChange=(e)=>{
    const { name,value}= e.target;
    setForm((prev)=>({...prev,[name]:value}));
  };

  const handleFileChange =(e)=>{
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend=()=>{
        setForm((prev)=>({...prev,image:reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    onSave(form);
    setForm({
      name:"",
      gst:"",
      sizeType:"",
      price:"",
      description:"",
      image:""
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="GST"
            name="gst"
            value={form.gst}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Size Type"
            name="SizeType"
            value={form.sizeType}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Price (₹)"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              style={{ marginTop: "10px", maxHeight: "100px" }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddProductForm