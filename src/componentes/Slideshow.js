import React, { useRef, useEffect, useCallback } from "react";

import { ReactComponent as FlechaIzquierda } from '../img/iconmonstr-angel-left-thin.svg';
import { ReactComponent as FlechaDerecha } from '../img/iconmonstr-angel-right-thin.svg';
import styled from 'styled-components';



const Slideshow = ({
  children,
  controles = false,
  autoplay = false,
  velocidad = "500",
  intervalo = "5000"
}) => {

  const slideshow = useRef(null);

  const siguiente = useCallback(() => {
    //comprobamos que el slideshow tenga elementos
    if (slideshow.current.children.length > 0) {
      console.log('Siguiente');

      //obtenemos el primer elemento del slideshow
      const primerElemento = slideshow.current.children[0];

      //establecemos la transicion para el slideshow
      slideshow.current.style.transition = `${velocidad}ms ease all`;

      //Obtenemos el tamaño del slide
      const tamañoSlide = slideshow.current.children[0].offsetWidth;

      //movemos el slideshow
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        //Reiniciamos la posicion del Slideshow
        slideshow.current.style.transition = 'none';
        slideshow.current.style.transform = `translateX(0)`;

        //Tomamos el primer elemento y lo mandamos al final
        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener('transitionend', transicion);

      }

      //Eventlistener para cuando termina la animación
      slideshow.current.addEventListener('transitionend', transicion);

    }
  }, [velocidad]);

  const anterior = () => {
    console.log('Anterior');

    //comprobamos que el slideshow tenga elementos
    if (slideshow.current.children.length > 0) {

      //obtenemos el ultimo elemento del slideshow
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];

      //insertamos el ultimo elemento al inicio del slideshow
      slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild)

      slideshow.current.style.transition = 'none';
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;

      }, 30)

    }

  }

  //Automatizar el Slideshow 
  const intervaloSlideshow = useRef(null);

  useEffect(() => {
    if (autoplay) {

      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, intervalo);

      //Pausar el intervalo si el usuario lo requiere (ésta parte no funciona correctamente)
      /*slideshow.current.addEventListener('mouseenter', () => {
        clearInterval(intervaloSlideshow.current)
      });*/

      //Reanudar el slideshow
      /*slideshow.current.addEventListener('mouseleave', () => {
        intervaloSlideshow.current = setInterval(() => {
          siguiente();
        }, intervalo);
      })*/
    }


  }, [autoplay, intervalo, siguiente]);


  return (
    <ContenedorPricipal>
      <ContenedorSlideshow ref={slideshow}>
        {children}
      </ContenedorSlideshow>
      {controles && <Controles>
        <Boton onClick={anterior} >
          <FlechaIzquierda />
        </Boton>
        <Boton derecho onClick={siguiente} >
          <FlechaDerecha />
        </Boton>
      </Controles>}
    </ContenedorPricipal>
  );
}


const ContenedorPricipal = styled.div`
  position: relative;
`;
const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: .3s ease all;
  z-index: 10;
  max-height: 500px;
  position: relative;

  img{
    width: 100%;
    vertical-align: top;
  }
`;
const TextoSlide = styled.div`
  background: ${props => props.colorFondo ? props.colorFondo : "rgba(0, 0, 0, .5)"};
  color: ${props => props.colorTexto ? props.colorTexto : "#FFF"};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width:700px) {
    position: relative;
    background: #000;
  }
  `;
const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
const Boton = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: .3s ease all;
  &:hover{
    background: rgba(0,0,0,.3);
    path{
      fill: #fff;
    }
  }

  path{
    filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #000)' : 'drop-shadow(2px 0px 0px #000)'};
  }

  ${props => props.derecho ? 'right: 0' : 'left: 0'};

  

`;

export { Slideshow, Slide, TextoSlide } 