document.addEventListener('DOMContentLoaded', function() {
    // --- DATA ---
    // In a real app, this would come from a server/API
    const mockData = {
        counties: [
            { id: 'cork', name: 'Cork' },
            { id: 'dublin', name: 'Dublin' },
            { id: 'galway', name: 'Galway' },
            { id: 'limerick', name: 'Limerick' },
            { id: 'waterford', name: 'Waterford' }
        ],
        dates: {
            cork: ['2026-03-05', '2026-03-12', '2026-03-19', '2026-03-26'],
            dublin: ['2026-03-04', '2026-03-11', '2026-03-18', '2026-03-25'],
            galway: ['2026-03-06', '2026-03-13', '2026-03-20', '2026-03-27'],
            limerick: ['2026-03-07', '2026-03-14', '2026-03-21', '2026-03-28'],
            waterford: ['2026-03-08', '2026-03-15', '2026-03-22', '2026-03-29']
        },
        times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    };

    // --- STATE ---
    let bookingState = {
        county: null,
        date: null,
        time: null
    };

    // --- DOM ELEMENTS ---
    const steps = {
        step1: document.getElementById('step-1'),
        step2: document.getElementById('step-2'),
        step3: document.getElementById('step-3'),
        step4: document.getElementById('step-4')
    };

    const countyOptions = document.getElementById('county-options');
    const dateOptions = document.getElementById('date-options');
    const timeOptions = document.getElementById('time-options');

    const backToCountyBtn = document.getElementById('back-to-county');
    const backToDateBtn = document.getElementById('back-to-date');
    const newBookingBtn = document.getElementById('new-booking');

    const selectedCountyName = document.getElementById('selected-county-name');
    const selectedDateName = document.getElementById('selected-date-name');

    // --- FUNCTIONS ---
    function showStep(stepToShow) {
        Object.values(steps).forEach(step => step.classList.remove('active'));
        steps[stepToShow].classList.add('active');
    }

    function renderCounties() {
        mockData.counties.forEach(county => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = county.name;
            button.dataset.countyId = county.id;
            button.addEventListener('click', () => selectCounty(county));
            countyOptions.appendChild(button);
        });
    }
    
    function selectCounty(county) {
        bookingState.county = county;
        renderDates(county.id);
        selectedCountyName.textContent = county.name;
        showStep('step2');
    }

    function renderDates(countyId) {
        dateOptions.innerHTML = ''; // Clear previous dates
        mockData.dates[countyId].forEach(dateString => {
            const button = document.createElement('button');
            button.className = 'option-button';
            // Format date for display
            const date = new Date(dateString + "T00:00:00");
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            button.textContent = date.toLocaleDateString('en-IE', options);
            button.dataset.date = dateString;
            button.addEventListener('click', () => selectDate(dateString, button.textContent));
            dateOptions.appendChild(button);
        });
    }

    function selectDate(dateString, dateDisplayText) {
        bookingState.date = dateString;
        renderTimes();
        selectedDateName.textContent = dateDisplayText;
        showStep('step3');
    }

    function renderTimes() {
        timeOptions.innerHTML = ''; // Clear previous times
        mockData.times.forEach(time => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = time;
            button.dataset.time = time;
            button.addEventListener('click', () => confirmBooking(time));
            timeOptions.appendChild(button);
        });
    }

    function confirmBooking(time) {
        bookingState.time = time;
        populateConfirmation();
        showStep('step4');
    }

    function populateConfirmation() {
        document.getElementById('confirm-service').textContent = 'Boiler Service'; // Static for demo
        document.getElementById('confirm-county').textContent = bookingState.county.name;
        
        const date = new Date(bookingState.date + "T00:00:00");
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('confirm-date').textContent = date.toLocaleDateString('en-IE', options);

        document.getElementById('confirm-time').textContent = bookingState.time;
    }

    function resetBookingFlow() {
        bookingState = { county: null, date: null, time: null };
        showStep('step1');
    }

    // --- EVENT LISTENERS ---
    backToCountyBtn.addEventListener('click', () => showStep('step1'));
    backToDateBtn.addEventListener('click', () => showStep('step2'));
    newBookingBtn.addEventListener('click', resetBookingFlow);

    // --- INITIALIZATION ---
    renderCounties();
});
