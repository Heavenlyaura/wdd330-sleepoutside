class Alert {
  constructor() {}

  async fetchAlerts() {
    try {
      console.log('Fetching alerts...');
      const response = await fetch('/json/alerts.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const alerts = await response.json();
      console.log('Fetched alerts:', alerts);
      this.displayAlerts(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }

  displayAlerts(alerts) {
    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list';

    alerts.forEach(alert => {
      const alertParagraph = document.createElement('p');
      alertParagraph.textContent = alert.message;
      alertParagraph.style.backgroundColor = alert.background;
      alertParagraph.style.color = alert.color;
      alertSection.appendChild(alertParagraph);

      // Set timeout to remove the alert after 15 seconds
      setTimeout(() => {
        alertParagraph.remove();
        // If the alert section is empty, remove it as well
        if (alertSection.childElementCount === 0) {
          alertSection.remove();
        }
      }, 15000);
    });

    console.log('Appending alert section to body');
    document.body.appendChild(alertSection);
  }

  showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 15000); // 15000 milliseconds = 15 seconds
  }
}

export default Alert;
