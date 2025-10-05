import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  type: string;
  conditions: any;
  status: string;
  participants: number;
  weather: {
    wind: number;
    rain: number;
    temp: number;
  };
}

interface EventTemplate {
  name: string;
  color: string;
  conditions: string;
}

interface Participant {
  name: string;
  phone: string;
  initials: string;
  color: string;
  alertsEnabled: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClimEvent';
  activeTab = 'home';
  
  // Participantes do evento
  participantsList: Participant[] = [];
  participantForm: Participant = {
    name: '',
    phone: '',
    initials: '',
    color: '',
    alertsEnabled: true
  };
  
  // Métodos para gerenciar participantes
  addNewParticipant() {
    if (this.participantForm.name.trim() === '') return;
    
    // Gerar iniciais a partir do nome
    const nameParts = this.participantForm.name.split(' ');
    this.participantForm.initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      : nameParts[0].substring(0, 2).toUpperCase();
    
    // Gerar cor aleatória
    const colors = ['#4A90E2', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    this.participantForm.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Adicionar à lista
    this.participantsList.push({...this.participantForm});
    
    // Resetar formulário
    this.participantForm = {
      name: '',
      phone: '',
      initials: '',
      color: '',
      alertsEnabled: true
    };
  }
  
  removeNewParticipant(participant: Participant) {
    this.participantsList = this.participantsList.filter(p => p !== participant);
  }

  events: Event[] = [
    {
      id: 1,
      name: 'Campeonato de Kitesurf',
      date: '2025-10-15',
      time: '14:00',
      type: 'esporte',
      conditions: { windMin: 15, windMax: 30, noRain: true },
      status: 'ideal',
      participants: 45,
      weather: { wind: 18, rain: 5, temp: 24 }
    },
    {
      id: 2,
      name: 'Casamento Ana & Pedro',
      date: '2025-11-20',
      time: '18:00',
      type: 'casamento',
      conditions: { noRain: true, tempMin: 20, tempMax: 30 },
      status: 'alerta',
      participants: 150,
      weather: { wind: 12, rain: 65, temp: 22 }
    },
    {
      id: 3,
      name: 'Festival de Música',
      date: '2025-12-05',
      time: '20:00',
      type: 'festival',
      conditions: { noRain: true, tempMax: 32 },
      status: 'ideal',
      participants: 5000,
      weather: { wind: 8, rain: 10, temp: 28 }
    },
    {
      id: 4,
      name: 'Trilha Ecológica',
      date: '2025-10-22',
      time: '07:00',
      type: 'esporte',
      conditions: { noRain: true, tempMin: 15, tempMax: 28 },
      status: 'ideal',
      participants: 32,
      weather: { wind: 10, rain: 0, temp: 20 }
    },
    {
      id: 5,
      name: 'Sessão de Fotos Externa',
      date: '2025-10-28',
      time: '16:00',
      type: 'fotografia',
      conditions: { cloudyCover: true, noRain: true },
      status: 'monitorando',
      participants: 8,
      weather: { wind: 15, rain: 20, temp: 25 }
    },
    {
      id: 6,
      name: 'Maratona de Corrida',
      date: '2025-11-10',
      time: '06:00',
      type: 'esporte',
      conditions: { tempMin: 15, tempMax: 25, noRain: true },
      status: 'ideal',
      participants: 1200,
      weather: { wind: 5, rain: 5, temp: 19 }
    }
  ];

  eventTemplates: EventTemplate[] = [
    { 
      name: 'Kitesurf/Windsurf', 
      color: 'bg-blue-500',
      conditions: 'Vento 15-30 km/h, sem chuva'
    },
    { 
      name: 'Casamento', 
      color: 'bg-blue-600',
      conditions: 'Sem chuva, temp. 20-30°C'
    },
    { 
      name: 'Churrasco', 
      color: 'bg-blue-500',
      conditions: 'Sem chuva, ensolarado'
    },
    { 
      name: 'Fotografia', 
      color: 'bg-blue-600',
      conditions: 'Nublado leve, sem chuva'
    },
    { 
      name: 'Corrida/Maratona', 
      color: 'bg-blue-500',
      conditions: 'Temp. 15-25°C, sem chuva'
    },
    { 
      name: 'Festival/Show', 
      color: 'bg-blue-600',
      conditions: 'Sem chuva, temp. moderada'
    },
    { 
      name: 'Piquenique', 
      color: 'bg-blue-500',
      conditions: 'Ensolarado, sem vento forte'
    },
    { 
      name: 'Voo de Parapente', 
      color: 'bg-blue-600',
      conditions: 'Vento 10-20 km/h, visibilidade'
    },
    { 
      name: 'Pesca Esportiva', 
      color: 'bg-blue-500',
      conditions: 'Nublado, vento leve'
    },
    { 
      name: 'Parque Aquático', 
      color: 'bg-blue-600',
      conditions: 'Ensolarado, temp. 25-35°C'
    },
    { 
      name: 'Trilha/Camping', 
      color: 'bg-blue-500',
      conditions: 'Sem chuva, temp. 10-28°C'
    },
    { 
      name: 'Evento Corporativo', 
      color: 'bg-blue-600',
      conditions: 'Sem chuva, temp. confortável'
    }
  ];

  participants: Participant[] = [
    {
      name: 'Maria Clara',
      phone: '+55 (62) 98888-7777',
      initials: 'MC',
      color: 'bg-blue-100 text-blue-700',
      alertsEnabled: true
    },
    {
      name: 'Pedro Santos',
      phone: '+55 (62) 97777-6666',
      initials: 'PS',
      color: 'bg-purple-100 text-purple-700',
      alertsEnabled: true
    },
    {
      name: 'Ana Ferreira',
      phone: '+55 (62) 96666-5555',
      initials: 'AF',
      color: 'bg-orange-100 text-orange-700',
      alertsEnabled: false
    }
  ];

  newParticipant = {
    name: '',
    phone: ''
  };

  newEvent = {
    name: '',
    date: '',
    time: ''
  };

  weatherConditions = {
    noRain: false,
    wind: { enabled: false, min: 15, max: 30 },
    temperature: { enabled: false, min: 20, max: 30 },
    humidity: { enabled: false, min: 40, max: 70 },
    sunny: false,
    cloudy: false,
    visibility: { enabled: false, min: 10 },
    pressure: { enabled: false, min: 1010, max: 1025 },
    uvIndex: { enabled: false, max: 5 },
    noStorms: false,
    noStrongWind: false,
    feelsLike: { enabled: false, min: 18, max: 28 },
    cloudCover: { enabled: false, min: 0, max: 40 }
  };

  settings = {
    profile: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      whatsapp: '+55 (62) 98765-4321'
    },
    notifications: {
      whatsapp: true,
      email: true,
      critical: true,
      reminders: false
    },
    preferences: {
      tempUnit: 'celsius',
      speedUnit: 'kmh',
      location: 'Goiânia, Goiás'
    }
  };

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  getStatusClass(status: string): string {
    if (status === 'ideal') {
      return 'bg-sky-primary/10 text-sky-primary border border-sky-primary/20';
    }
    return 'bg-sun-alerts/10 text-sun-alerts border border-sun-alerts/20';
  }

  getStatusText(status: string): string {
    if (status === 'ideal') {
      return 'Condições Ideais';
    }
    return 'Monitorando';
  }

  addParticipant(): void {
    if (this.newParticipant.name && this.newParticipant.phone) {
      const initials = this.newParticipant.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
      
      const colors = [
        'bg-blue-100 text-blue-700',
        'bg-purple-100 text-purple-700',
        'bg-orange-100 text-orange-700',
        'bg-green-100 text-green-700',
        'bg-pink-100 text-pink-700'
      ];
      
      this.participants.push({
        name: this.newParticipant.name,
        phone: this.newParticipant.phone,
        initials: initials,
        color: colors[Math.floor(Math.random() * colors.length)],
        alertsEnabled: true
      });

      this.newParticipant = { name: '', phone: '' };
    }
  }

  removeParticipant(index: number): void {
    this.participants.splice(index, 1);
  }

  createEvent(): void {
    console.log('Criando evento:', this.newEvent);
    console.log('Condições climáticas:', this.weatherConditions);
    console.log('Participantes:', this.participants);
    // Aqui você implementaria a lógica de criação do evento
  }
}
// Nosso aplicativo é uma plataforma de previsão climática personalizada que envia alertas automáticos via WhatsApp quando o tempo muda de forma que pode afetar seus planos ou eventos. 

// Diferente dos apps comuns, o usuário define as condições que quer ou que quer evitar e o sistema avisa quando algo muda, usando dados da NASA (avaliar no site da nasa quais dados conseguimos pegar e como utiliza-los) e Machine Learning (ML) (compreender como que aqueles dados que escolhemos nos levará à projeção) de Regressão Linear para prever cenários com antecedência. 

//  

// O que faz: Permite que o usuário configure parâmetros climáticos específicos que determinam o sucesso ou falha de um plano (ex: vento entre 18-25 nós, temperatura sem picos extremos, ausência de raios). 

//  

// Como funciona: Utiliza Machine Learning (ML) de Regressão Linear com alta acurácia, combinando dados históricos e satelitais (incluindo NASA) para gerar projeções detalhadas de longo prazo (até 6 meses). 

//  

// O Valor Central: O usuário não precisa mais interpretar previsões genéricas. O aplicativo monitora ativamente as condições específicas definidas e, se houver uma mudança que coloque o plano em risco, dispara um alerta imediato e personalizado ao usuário. 

//   

// O usuário deixa de ser passivo e recebe um serviço proativo e preditivo que o avisa instantaneamente sobre mudanças críticas, mitigando prejuízos e frustrações. 

//  \ 

//   

//   

//  

// Pilar 

// Diferencial 

// Impacto Comprovado (Exemplos) 

// Planejamento Customizado 

// O app trabalha para os seus critérios e não para a previsão média da cidade. 

// Evita cancelamentos caros de eventos de Surf devido a ondas abaixo do ideal (≈0,8m). 

// Mitigação de Risco 

// Alertas inteligentes e imediatos sobre condições de segurança crítica (raios, vendaval, calor extremo). 

// Previne o caos em grandes shows (Lollapalooza, shows no Litoral do PR) causados por riscos súbitos e perigosos. 

// Visão Estratégica 

// Projeções de risco de longo prazo (1 a 6 meses) para a tomada de decisão estratégica de datas. 

// Permite que organizadores de casamentos ou festivais (como o Rock in Rio) escolham períodos de menor probabilidade de falha climática, reduzindo a incerteza. 

// Comunicação Proativa 

// Utilização de um canal de alta visibilidade (WhatsApp) para comunicação instantânea e em massa sobre mudanças. 

// Melhora a satisfação do público e a gestão de crises (ex: atraso ou cancelamento no Tomorrowland) com agilidade. 

// estamos documentando tudo, vc acha q cabe alguma alteração noq ja esta feito?

//

