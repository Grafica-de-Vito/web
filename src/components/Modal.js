import React from "react";
import { Modal } from "@nextui-org/react";

export default function ModalUI({ visible, setVisible, scroll = false, blur = false, animated = true, noPadding = false, closeButton = false, fullScreen = false, autoMargin = false, preventClose = false, width = '400px', header, body, footer }) {
    const closeHandler = () => setVisible(false);

    return (
        <div>
            <Modal
                scroll={scroll}
                blur={blur}
                animated={animated}
                noPadding={noPadding}
                closeButton={closeButton}
                fullScreen={fullScreen}
                autoMargin={autoMargin}
                preventClose={preventClose}
                width={width}
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    {header}
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            </Modal>
        </div>
    );
}