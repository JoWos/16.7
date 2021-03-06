// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Brak';
	this.columnId = columnId;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardDescription.click(function() {
			var newCardName = prompt('Zmień nazwę karty: ' + self.name);
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: newCardName,
					bootcamp_kanban_column_id: self.columnId
				},
				success: function(response) {
					self.name = newCardName;
					cardDescription.text(newCardName);
				}
			})
		})
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}


Card.prototype = {
	removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.element.remove();
            }
        });
	}
}