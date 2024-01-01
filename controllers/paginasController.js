import { Viaje } from '../models/Viaje.js';
import { Testimonio } from '../models/Testimonio.js';

const paginaInicio = async (req,res) => {
    // Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonio.findAll({ limit: 3 }) );

    try {
       const resultado = await Promise.all( promiseDB );

       res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (req, res) => {   
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {  
    // Consultar BD
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}

const paginaTestimonios = async (req, res) => { 
    try {
        const testimonios = await Testimonio.findAll();
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        });
    } catch (error) {
        console.log(error)
    }
    
    
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try {
       const viaje = await Viaje.findOne({ where : { slug }}); 
       res.render('viaje', {
        pagina: 'Información Viaje',
        viaje
       })
    } catch (error) {
        console.log(error);
    }
}

export {
   paginaInicio,
   paginaNosotros, 
   paginaViajes,
   paginaTestimonios,
   paginaDetalleViaje
}