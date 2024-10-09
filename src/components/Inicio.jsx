import { Link } from "react-router-dom";
import fondo from "../assets/fondo.png"


const Inicio = () => {
    return(
        <>
        <img style={styles.imagen_iniciales} src={fondo}></img>

        <section style={styles.letras_iniciales}>
            <div >
                <h1 style={styles.green}>Eat</h1>
                <h1>Well</h1>
            </div>
            <div>
                <h1 style={styles.green}>Eat</h1>
                <h1>Well</h1>
            </div>
            <div>
                <h1 style={styles.green}>Eat</h1>
                <h1>Well</h1>
            </div>
        </section>
        <Link to="/login">
            <button >Dame Aqui</button>
        </Link>

            

        </>
    )
}
    
    const styles = {

      imagen_iniciales:{
        width: '100%',
        height: '50vh'
      },

      letras_inciales:{
        display: 'flex',
        flexdirection: 'column'

      },
      div:{

      }
    //     green: {
    //     color: '#93D8A2',
    //   },
    

    };
    export default Inicio;
