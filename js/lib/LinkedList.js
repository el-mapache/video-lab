(function(root) {
  var linkedListMethods = {
    add: function(value) {
      var newNode = makeNode(value);

      // If there is no head node, make this node the head.
      if (!this.head) {
        this.head = newNode;
      }

      // there is a tail node set, so add a pointer to the new node
      if (this.tail) {
        this.tail.next = newNode;
      }

      // make the new node the new tail node.
      this.tail = newNode;
    },

    remove: function() {
      // get the first node
      var currentNode = this.head;

      // assign the pointer to the next node as the new head.
      this.head = currentNode.next;

      // zero out the reference to our currentNode variable
      currentNode = null;
    },

    contains: function(value) {
      var currentNode = this.head;

      while (currentNode) {
        if (currentNode.data === value) {
          return true;
        }

        currentNode = currentNode.next;
      }

      return false;
    },

    insertAfter: function(node, newNode) {
      // The newNode next pointer is set to the next pointer of the
      // node its being inserted after.
      newNode.next = node.next;

      // set the next pointer of the original node to be the newNode.
      node.next = newNode;
    }
  };

  // @class Node
  var makeNode = function(value) {
    return {
      data: value,
      next: null
    };
  };


  // @class LinkedList
  var LinkedList = function() {
    var list = Object.create(linkedListMethods);

    list.head = null;
    list.tail = null;

    return list;
  };

  root.LinkedList = LinkedList;
})(window);