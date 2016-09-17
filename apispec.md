Paths
=====

/
/api
	/user
		/create
		/login
		/logout
		/delete <- not sure if we should include this
		/logo
		/blurb
	/landlord
		/floorplan
			/add
			/delete
			/list
			/{id}/show
		/room
			/{floorplan_id}/generate
			/{id}/get
			/{id}/delete
			/list
		/item
			/{id}
			/{id}/update
			/{id}/remove
		/printout
			/room/{id} <- creates a printout of the form you hand to tenant. should include url, qr code, logo and blurb
			/report <- damage report for the rooms
				[blank for all reports]
				/{id}
		/analytics
			[TBD]
	/{id}
		/update
		/submit
/landlord

Todo
====
* landlord should be able to add the following to their printouts
	* logo
	* blurb about what to do
* heatmap may be a good idea for analytics
