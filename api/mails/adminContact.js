module.exports = `
<p>Форма контактов</p>
<% if(name) {  %> <p>Имя: <%=name%></p> <% } %>
<% if(phone) {  %> <p>Телефон: <%=phone%></p> <% } %>
<% if(email) {  %> <p>Email: <%=email%></p> <% } %>
<% if(message) {  %> <p>Message: <%=email%></p> <% } %>
`