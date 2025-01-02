function generateCertificate() {
    const studentName = document.getElementById('studentName').value || 'Student Name';
    const instructorName = document.getElementById('instructorName').value || 'Instructor Name';
    const trainingName = document.getElementById('trainingName').value || 'Training Name';

    // Set the text dynamically on the certificate
    document.getElementById('cert-student-name').innerText = studentName;
    document.getElementById('cert-instructor-name').innerText = instructorName;
    document.getElementById('cert-training-name').innerText = trainingName;

    // Make the certificate visible for rendering
    const certificateElement = document.getElementById('certificate');
    certificateElement.style.display = 'block';

    html2canvas(certificateElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('landscape', 'px', [canvas.width, canvas.height]);

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${studentName}-certificate.pdf`);
        
        // Hide certificate preview after saving
        certificateElement.style.display = 'none';
    });
}
