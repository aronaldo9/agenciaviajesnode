import { Testimonio } from '../models/Testimonio.js'

const guardarTestimonio = async (req, res) => {
    // Validar...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];
    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if(errores.length > 0) {
        // Consultar testimonios existentes
        const testimonios = await Testimonio.findAll();

        // Mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    } else {
        // Almacenar los datos en la BD
        try {
          await Testimonio.create({
            nombre,
            correo,
            mensaje
          });
          res.redirect('/testimonios'); 
        } catch (error) {
           console.log(error) 
        }
    }
}

export {
    guardarTestimonio
}