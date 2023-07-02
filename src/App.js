import React from "react";
import { Slideshow, Slide, TextoSlide } from "./componentes/Slideshow";
import './styles.css';
import styled from 'styled-components';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';

const App = () => {
  return (
    <main>
      <Titulo>Productos Destacados</Titulo>
      <Slideshow controles={true}>
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img1} alt="" />
          </a>
          <TextoSlide /*colorFondo="#DB073F" colorTexto="#000"*/>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img2} alt="" />
          </a>
          <TextoSlide>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img3} alt="" />
          </a>
          <TextoSlide>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img4} alt="" />
          </a>
          <TextoSlide>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
      </Slideshow>

      <Titulo>Productos Nuevos</Titulo>
      <Slideshow controles={false} autoplay={true} velocidad="3000" intervalo="5000" >
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img3} alt="" />
          </a>
          <TextoSlide /*colorFondo="#DB073F" colorTexto="#000"*/>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://sntsedatu.vercel.app/">
            <img src={img4} alt="" />
          </a>
          <TextoSlide>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
      </Slideshow>

    </main>);
}

const Titulo = styled.p`
font-size: 18px;
font-weight: 700;
text-transform: uppercase;
margin-bottom: 10px;
`;

export default App;