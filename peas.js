//
// peas.js
//
// tree data structure in javascript
//

//////////////////////////

var peas = function() {


	// "sub" here is used as an object container for
	// operations related to sub nodes.
	// Each pea node will have a "sub" property
	// with an instance of "sub"
	var sub = function() {}

	// the current node is accesable as "this.pea", from
	// methods in the "sub" object
	sub.prototype.pea = null

	// first and last sub
	sub.prototype.first = null
	sub.prototype.last = null

	// number of sub nodes
	sub.prototype.n = 0



	// get subnode at index position (0 index)
	sub.prototype.at = function( index ) {

		var pik,i

		if( index > this.pea.sub.n - 1 )
			return null

		pik = this.pea.sub.first
		for( i=0; i<index; i++ )
			pik = pik.next

		return pik
	}



	// add spare node at last position
	// returns the added node
	sub.prototype.add = function( spare ) {

		if( this.pea.sub.last ) {
			spare.prev = this.pea.sub.last
			this.pea.sub.last.next = spare
			this.pea.sub.last = spare
		} else {
			spare.prev = null
			this.pea.sub.first = spare
			this.pea.sub.last = spare
		}

		spare.top = this.pea
		spare.next = null

		this.pea.sub.n++
		return spare
	}



	// insert sub node at index position
	// returns the inserted node
	sub.prototype.insertAt = function( spare, index ) {
		var pik

		// validate index given
		if( index < 0 )
			throw "node insert failed, invalid index"
		if( index > this.pea.sub.n )
			throw "node insert failed, given index exceeds valid places"

		// if insert at last+1, then just add
		if( index == this.pea.sub.n ) {
			this.pea.add( spare )
			return
		}

		pik = this.pea.sub.at( index )

		spare.prev = pik.prev
		spare.next = pik

		// if not inserting at first
		if( pik.prev ) {

			pik.prev.next = spare
		} else {
			// inserting as first
			pik.top.sub.first = spare

		}

		pik.prev = spare

		spare.top = this.pea


		this.pea.sub.n++

		return spare
	}


	// executes function "action" on each direct
	// sub node (not recursive)
	sub.prototype.each = function( action ) {

		var node = this.pea.sub.first
		while( node ) {
			action( node )
			node = node.next
		}

	}



	///////////////////////////

	// constructor function for pea nodes
	peas = function( item ) {
	  this.sub = new sub()
	  this.sub.pea = this
	  this.item = item
	}


	peas.prototype.item = null

	// top node
	peas.prototype.top = null

	// prev
	peas.prototype.prev = null

	// next
	peas.prototype.next = null

	// namespace for sub nodes
	peas.prototype.sub = {}



	// find the root node, of the tree
	// of this node
	peas.prototype.root = function() {

		var node = this
		while ( node.top ) node = node.top

	}


	// executes function func on all the tree
	// nodes below (recursively)
	peas.prototype.onAllBelow = function( action ) {

		var node = this.sub.first

		while( node ) {
			action( node )

			if( node.sub.n > 0 )
				nodeMethods.each( action )

			node = node.next
		}

	}


	// removes this node from tree, leaving
	// other tree nodes in consistent state
	peas.prototype.rip = function() {

		if( ! this.top ) return this

		if( this.next )
			this.next.prev = this.prev
		if( this.prev )
			this.prev.next = this.next

		if( this.top.sub.last == this	)
			this.top.sub.last = this.prev

		if( this.top.sub.first == this )
			this.top.sub.first = this.next

		this.top.sub.n--

		this.top = null
		this.next = null
		this.prev = null

		return this
	}


	// returns an array containing all nodes below this, in the tree
	peas.prototype.flat = function() {

		var flat = []

		var grab = function( node ) {
			flat.push( node )
		}
		root.onAllBelow( grab )

		return flat
	}


	// puts spare node in the tree,
	// before of this node.
	// returns the inserted node
	peas.prototype.putBefore = function( spare ) {

		if( ! this.top )
			throw "not in a tree"

		if ( this.prev )
			this.prev.next = spare

		if( this.top.sub.first == this )
			this.top.sub.first = spare

		spare.next = this
		spare.prev = this.prev
		this.prev = spare
		spare.top = this.top

		this.top.sub.n++

		return spare
	}


	return peas
}()


















