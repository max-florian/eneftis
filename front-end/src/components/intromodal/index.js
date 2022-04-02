import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Checkbox
  } from '@chakra-ui/react'
  

function IntroModal({ isOpen, onClose }) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    const closeButton = () => {
      localStorage.setItem("hide_ms", (checked).toString());
      onClose();
    }

    useEffect(() => {
      let modalStorage = localStorage.getItem("hide_ms");
      if (modalStorage) {
        setChecked(modalStorage === 'true');
      }else{
        localStorage.setItem("hide_ms", 'false');
      }
    }, []);

    return (
      <>
        {
          localStorage.getItem("hide_ms") === 'false' && <Modal 
          isOpen={isOpen} 
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>⚠️ Atención ⚠️</ModalHeader>
            <ModalCloseButton onClick={closeButton}/>
            <ModalBody>
              <Text>
                Actualmente la aplicación se encuentra desplegada en la red de prueba de Rinkeby, por lo que, para obtener
                tu NFT deberás tener una billetera de Metamask en dicha red.
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Checkbox 
                colorScheme='red' 
                mr={6}
                onChange={handleChange}
              >
                Don't show me this again.
              </Checkbox>
              <Button colorScheme='blue' mr={3} onClick={closeButton}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        }
      </>
    )
  }

  export default IntroModal;