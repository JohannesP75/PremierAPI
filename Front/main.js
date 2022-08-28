const URL="https://localhost:7158/Customers";
/*
    Fonction relations avec API
*/

/**
 * @param {URL} url
 * @param {Function} callback
 * @returns Données JSON
 */
 async function fetchJSONData(url){
    return await fetch(url).then(data=>data.json());
}

/**
 * 
 * @returns Liste des clients
 */
async function getClients(){
    return await fetchJSONData(URL);
}

/**
 * 
 * @param {int} id Identifiant du client
 * @returns Informations sur le client id
 */
async function getClient(id){
    return await fetchJSONData(URL+id);
}

/**
 * Active la modification de la ligne représentant un client donné
 * @param {int} id Identifiant du client à modifier
 */
function editClient(id){
    // Récupération des cases
    var colNom=document.getElementById("col-name-"+id);
    var colTel=document.getElementById("col-tel-"+id);
    var colStat=document.getElementById("col-status-"+id);
    
    // Valeurs originelles
    var valDef=colStatus.innerText;

    // Modification des cases
    var inpNom=document.createElement("input");
    inpNom.value=colNom.innerText;
    inpNom.setAttribute("id", "inp-edit-name-"+id);
    colNom.innerText="";
    colNom.appendChild(inpNom);

    var inpTel=document.createElement("input");
    inpTel.setAttribute("id", "inp-edit-tel-"+id);
    inpTel.setAttribute("type", "tel");
    inpTel.value=colTel.querySelector("a").innerText;
    colTel.removeChild(colTel.querySelector("a"));

    var inpStat=document.createElement("select");
    var options=[];
    var defOpt=document.createElement("select");
    defOpt.label="-- Choississez un statut --";
    defOpt.value="";

    for(var i=0;i<4;i++){
        var opt=document.createElement("option");
        opt.label=statutClient(i);
        opt.value=i;
        options.push(opt);

        if(i==valDef)opt.selected=true;
    }
    
    inpStat.appendChild(options);
    colStat.appendChild(colStat);
}

async function saveClient(id){
    // Récupération des données
    var inpNom=document.getElementById("inp-edit-name-"+id);
    var inpTel=document.getElementById("inp-edit-tel-"+id);
    var inpStat=document.getElementById("inp-edit-status-"+id);

    var newName=colNom.innerText;
    var newTel;
    var newStat=colStat.innerText;

    // Envoi des données au serveur

    // Retour à la normale pour les colonnes
}

/**
 * Supprime le client
 *  @param {int} id Identifiant du client à supprimer
 */
async function deleteClient(id){
    const options={
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    fetch(URL+id, options)
    .then(response=>response.json())
    .then(response=>console.log(response));
}

async function createClient(){
    var name=document.getElementById("new-cust-nom").value;
    var tel=document.getElementById("new-cust-tel").value;
    var status=document.getElementById("new-cust-sta").value;

    alert(`Nom : ${name}\nTéléphone : ${tel}\nStatut : ${status}`);
    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            name: name,
            numeroTel: tel,
            status: status
        })
    };

    console.log(options);
    fetch(URL, options)
    .then(response=>response.json())
    .then(response=>console.log(response));
}
/*
    Présentation graphique
 */

async function remplirListe(e){
    e.preventDefault();
    
    // Récupération du tableau
    var tableClients=document.getElementById("list-clients");
    
    // Elimination des anciennes valeurs
    var old_body_table=tableClients.querySelector("tbody");
    if(old_body_table!=null)
        tableClients.removeChild(old_body_table);

    // Création du nouveau <tbody>
    var body_table=document.createElement("tbody");
    var listeJSON=await getClients();

    console.log(listeJSON);

    for(var i=0;i<listeJSON.length;i++){
        var ligne=document.createElement("tr");
        
        // ID
        var colID=document.createElement("th");
        colID.innerText=listeJSON[i].id;
        ligne.appendChild(colID);

        // Nom
        var colName=document.createElement("td");
        //var inputName=document.createElement("input");
        //inputName.innerText=listeJSON[i].name;
        colName.innerText=listeJSON[i].name;
        colName.setAttribute("id", "col-name-"+listeJSON[i].id);
        ligne.appendChild(colName);

        // Téléphone
        var colTel=document.createElement("td");
        colTel.setAttribute("id", "col-tel-"+listeJSON[i].id);
        var lienTel=document.createElement("a");
        lienTel.href="tel:"+listeJSON[i].numeroTel;
        lienTel.innerText=listeJSON[i].numeroTel;
        colTel.appendChild(lienTel);
        ligne.appendChild(colTel);

        // Statut
        var colStatus=document.createElement("td");
        colStatus.setAttribute("id", "col-status-"+listeJSON[i].id);
        colStatus.innerText=statutClient(listeJSON[i].status);
        ligne.appendChild(colStatus);

        // Actions
        var colAction=document.createElement("td");
        
        // Bouton modification
        var butEdit=document.createElement("button");
        butEdit.setAttribute("onclick", "editClient("+listeJSON[i].id+")");
        butEdit.setAttribute("title", "Supprimer");
        butEdit.setAttribute("id", "button-edit-"+listeJSON[i].id);
        butEdit.innerText="Modifier";

        // Bouton Sauvegarde modifications
        var butSave=document.createElement("button");
        butSave.setAttribute("onclick", "saveClient("+listeJSON[i].id+")");
        butSave.setAttribute("title", "Sauvegarder");
        butSave.setAttribute("disabled", "true");
        butSave.setAttribute("hidden", "true");
        butSave.setAttribute("id", "button-save-"+listeJSON[i].id);
        butEdit.innerText="Sauvebarder";

        // Bouton suppression
        var butDelete=document.createElement("button");
        butDelete.setAttribute("onclick", "deleteClient("+listeJSON[i].id+")");
        butDelete.setAttribute("title", "Supprimer");
        butDelete.innerText="Supprimer";

        colAction.appendChild(butEdit);
        colAction.appendChild(butDelete);
        ligne.appendChild(colAction);

        body_table.appendChild(ligne);
    }

    tableClients.appendChild(body_table);
}

function statutClient(statut){
    var S="NULL";
    
    switch(statut){
        case 0:S="Ancien";break;
        case 1:S="Rare";break;
        case 2:S="Nouveau";break;
        case 3:S="Fréquent";break;
    }
    
    return S;
}