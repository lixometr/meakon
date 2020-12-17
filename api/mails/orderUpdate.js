module.exports = `
<p>Dear <%=info.first_name%>, we have important information about your oder #<%=order_id%>.</p> 
<p>Your order has just received a status update and is now <b><%=status%></b>.</p>
<br>
Order #<%=order_id%> details:
<br>
Date of order: <%=created_at%>
<br>
Services purchased: <%= _.map(products, product => product.item.name).join(', ')%>
<br>
Total amount paid: <%=currency%><%=total_price%>
<br>
<br>
In case you have any questions don’t hesitate to contact our support via contacts page: ссылка на страницу контактов https://lootchampion.com/eu/contact. We really appreciate that you have chosen Loot Champion as your prime source for all World of Warcraft related. 
<br>
<br>
With best regards,
Loot Champion team.
`