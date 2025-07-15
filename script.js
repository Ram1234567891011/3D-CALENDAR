const calendarDays = document.getElementById('calendarDays');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const reminderInput = document.getElementById('reminderInput');
    const reminderList = document.getElementById('reminderList');
    const reminderDate = document.getElementById('reminderDate');

    const reminders = {}; // dateString => ["reminder 1", "reminder 2"]

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function generateYearOptions(start = 1900, end = 2100) {
      for (let y = start; y <= end; y++) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      }
    }

    function generateMonthOptions() {
      months.forEach((m, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = m;
        monthSelect.appendChild(opt);
      });
    }

    function renderCalendar(month, year) {
      calendarDays.innerHTML = "";
      monthSelect.value = month;
      yearSelect.value = year;
      const firstDay = new Date(year, month).getDay();
      const numDays = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        calendarDays.appendChild(empty);
      }

      for (let day = 1; day <= numDays; day++) {
        const div = document.createElement("div");
        div.className = "day";
        div.textContent = day;

        const dateStr = `${year}-${month + 1}-${day}`;

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          div.classList.add("today");
        }

        if (reminders[dateStr]) {
          div.classList.add("event-day");
        }

        div.onclick = () => {
          reminderDate.textContent = `${months[month]} ${day}, ${year}`;
          reminderInput.dataset.date = dateStr;
          displayReminders(dateStr);
        };

        calendarDays.appendChild(div);
      }
    }

    function prevMonth() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    }

    function goToday() {
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
      renderCalendar(currentMonth, currentYear);
    }

    function toggleTheme() {
      document.body.classList.toggle("light-mode");
    }

    function addReminder() {
      const date = reminderInput.dataset.date;
      if (!date) return;
      const text = reminderInput.value.trim();
      if (!text) return;
      if (!reminders[date]) reminders[date] = [];
      reminders[date].push(text);
      reminderInput.value = "";
      renderCalendar(currentMonth, currentYear);
      displayReminders(date);
    }

    function displayReminders(date) {
      reminderList.innerHTML = "";
      (reminders[date] || []).forEach((r, i) => {
        const li = document.createElement("li");
        li.textContent = r;
        reminderList.appendChild(li);
      });
    }

    generateYearOptions();
    generateMonthOptions();
    renderCalendar(currentMonth, currentYear);