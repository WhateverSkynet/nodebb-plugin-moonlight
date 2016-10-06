<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-default">
      <div class="panel-heading">Moonlight Settings</div>
      <div class="panel-body">
        <form role="form" class="moonlight-settings">
          <div class="form-group">
            <label for="key">Key</label>
            <input type="text" id="key" name="key" title="Key" class="form-control" placeholder="Key"><br />
          </div>

          <label>Region</label>
          <select class="form-control" name="region">					
						<option value="us">US</option>
						<option value="eu">EU</option>
						<option value="kr">KR</option>
						<option value="tw">TW</option>
						<option value="cn">CN</option>				
					</select>
          <div class="form-group">
            <label for="guild">Guild</label>
            <input type="text" id="guild" name="guild" title="Guild" class="form-control" placeholder="Guild">
          </div>
          <div class="form-group">
            <label for="realm">Realm</label>
            <input type="text" id="realm" name="realm" title="Realm" class="form-control" placeholder="Realm">
          </div>
        </form>
      </div>
      <div>
        Update Roster
        <button id="update" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
          <i class="material-icons">update</i>
        </button>
      </div>
    </div>
  </div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
  <i class="material-icons">save</i>
</button>