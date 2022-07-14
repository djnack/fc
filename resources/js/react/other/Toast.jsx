import { useState } from 'react';

export function ToastCenterTapToClose(params) {
    return (
        <div onClick={() => params.setShow(!params.show)} className={`toast-box toast-center tap-to-close ${params.show?'show':''}`}>
            <div className="in">
                <div className="text">{params.text}</div>
            </div>
        </div>
    );
}
