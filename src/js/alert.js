export default class Alert {
    constructor() {
      this.loadAlerts();
    }
  
    async loadAlerts() {
      try {
        const response = await fetch('./json/alerts.json');
        const alerts = await response.json();
        this.displayAlerts(alerts);
      } catch (error) {
        console.error('Error loading alerts:', error);
      }
    }
  
    displayAlerts(alerts) {
      if (alerts.length === 0) return;
  
      const alertSection = document.createElement('section');
      alertSection.classList.add('alert-list');
  
      alerts.forEach(alert => {
        const alertElement = document.createElement('p');
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertSection.appendChild(alertElement);
      });
  
      const mainElement = document.querySelector('main');
      mainElement.prepend(alertSection);
  
      // Remove the alert section after 10 seconds
      setTimeout(() => {
        alertSection.remove();
      }, 10000); // 10 seconds
    }
  }
  