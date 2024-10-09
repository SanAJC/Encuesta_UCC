import React, { useState } from 'react';
import '../styles/Form.css'
const Form = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    message_1: '',
    message_2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado', formData);
  };

  return (
    <div className='form'>
      <img src="./src/assets/ucc.png" alt="logo" id='logo' />
      <h1>Formulario de retroalimentacion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>ID Estudiante</span>
          <input type="number" name="id" value={formData.id} onChange={handleChange}/>
        </label>
        <label>
          <span>Correo Institucional</span>
          <input type="email" name="email" value={formData.email} onChange={handleChange}/>
        </label>
        <label>
          <span>Opinion de la Facultad de Ingenieria</span> 
          <textarea name="message_1" value={formData.message_1} onChange={handleChange}/>
        </label>
        <label>
          <span>Si existe un problema que suguieres para solucionarlo</span>
          <textarea name="message_2" value={formData.message_2} onChange={handleChange}/>
        </label>
        <button type="submit">Enviar Retroalimentacion</button>
      </form>
    </div>
    
  );
};

export default Form;
