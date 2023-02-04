import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import certificate from "../cert_templates/Volunteer Certificate.png";
import ReactToPrint from 'react-to-print';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

const CertificateGenerator = React.forwardRef(({name, heading, desc, qr, org, hours, issuedate, template}, ref) => {

    return (
        <div ref={ref} style={{height: '509', width: '720', position: 'absolute', top: "20%", border: '1px solid gray' }} id="certificate" >
            <img src={certificate} style={{height: 509,  width: '720' }}></img>
            <div className="info" style={{ position: 'absolute', top: '0%', left: '45%', width: '60%' }}>
                <p style={{ fontSize: 52, fontWeight:  '900', textTransform: 'uppercase', color: '#f68712',}}>{heading}</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#000000', textTransform: 'uppercase', textAlign: 'center', marginRight: '50px', marginTop:"-50px"}}>{'this certificate presented to :'}</p>
                <h1 style={{ fontSize: '3rem', color: '#f68712', textAlign: 'right', marginRight: '6rem',marginTop:"-30px"}}>{name}</h1>
                {/* </div>
            <div className="info" style={{ position: 'absolute', top: '0%', left: '45%', width: '60%' }}> */}
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#000000', textAlign: 'right',marginTop:"-37px", marginRight: "60px"}}>
                    {desc + 'of '} 
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0300b0' }}>{hours + " "}</span>
                    {'to '}
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0300b0' }}>{org}</span>
                </p>
            </div>  
            <div style={{ position: 'absolute', top: '68%', left: '75%', width: '60%' }}>
                <img src={qr} height={100} width={100} style={{zIndex: 10}}/> 
            </div>
            <div className="info" style={{ position: 'absolute', top: '90%', left: '78%', width: '60%' }}>
                <p style={{ fontSize: '12px', fontWeight:  '100', color: '#000000', marginBottom: '1rem' }}>{issuedate.getDate()+"-"+(issuedate.getMonth()+1)+"-"+issuedate.getFullYear()}</p>
            </div>
        </div>
    );
});

const CertGenButton = (props) => {
    const [pop, setpop] = useState(false);
    const [name, setname] = useState('ABC XYZ');
    const [heading, setheading] = useState('Volunteer Certificate');
    const [desc, setdesc] = useState('In recognition of outstanding and professional Volunteer Service ');
    const [org, setorg] = useState('Yasham Foundation');
    const [issuedate, setissuedate] = useState(new Date());
    const [qr, setqr] = useState('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Aditi-Mohan');
    const [hours, setHours] = useState(0);
    const [template,settemplate]=useState('certificate');
    const [author, setauthor] = useState('');
    const [logo, setlogo] = useState('');
    const componentRef = useRef();
    const [theme, setTheme] = useState("dark");

    return (
        <div>
            <button onClick={() => {
                    console.log(componentRef.current);
                    exportComponentAsJPEG(componentRef)
                }
            }>
                Export As JPEG
            </button>
            <button onClick={() => exportComponentAsPDF(componentRef)}>
                Export As PDF
            </button>
            <button onClick={() => exportComponentAsPNG(componentRef)}>
                Export As PNG
            </button>
            <div style={{flex: 0.60, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CertificateGenerator ref={componentRef} name={name} heading={heading} desc={desc} qr={qr} org={org} hours={hours} issuedate={issuedate} template={template} />
            </div>
        </div>
    )

}

export default CertGenButton;