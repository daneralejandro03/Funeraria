package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Fidelity;
import com.ucaldas.mssecurity.Models.Role;
import com.ucaldas.mssecurity.Models.Statistic;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.FidelityRepository;
import com.ucaldas.mssecurity.Repositories.RoleRepository;
import com.ucaldas.mssecurity.Repositories.StatisticRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private RoleRepository theRoleRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private StatisticRepository theStatisticRepository;
    @Autowired
    private FidelityRepository theFidelityRepository;

    @GetMapping("")
    public List<User> findAll(){
        return this.theUserRepository.findAll();
    }
    @ResponseStatus(HttpStatus.CREATED)

    @PostMapping
    public User create(@RequestBody User theNewUser){
        theNewUser.setPassword(this.theEncryptionService.convertSHA256(theNewUser.getPassword()));
        this.theUserRepository.save(theNewUser);
        this.fidelidadUsario(theNewUser);
        return theNewUser;
    }

    @GetMapping("{id}")
    public User findById(@PathVariable String id) {
        User theUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        return theUser;
    }

    @PutMapping("{id}")
    public User update(@PathVariable String id, @RequestBody User theNewUser) {
        User theActualUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        if (theActualUser != null) {
            theActualUser.setName(theNewUser.getName());
            theActualUser.setIdentificationCard(theNewUser.getIdentificationCard());
            theActualUser.setEmail(theNewUser.getEmail());
            theActualUser.setPassword(this.theEncryptionService.convertSHA256(theNewUser.getPassword()));
            this.theUserRepository.save(theActualUser);
            updateFidelity(theActualUser);
            return theActualUser;
        } else {
            return null;
        }
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        User theUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        if (theUser != null) {
            this.theUserRepository.delete(theUser);
        }
    }

    @PutMapping("{userId}/role/{roleId}")
    public User matchRole(@PathVariable String userId,@PathVariable String roleId) {
        User theActualUser = this.theUserRepository
                .findById(userId)
                .orElse(null);
        Role theActualRole=this.theRoleRepository
                .findById(roleId)
                .orElse(null);

        if (theActualUser != null && theActualRole!=null) {
            theActualUser.setRole(theActualRole);
            return this.theUserRepository.save(theActualUser);
        } else {
            return null;
        }
    }

    @PutMapping("{userId}/unmatch-role/{roleId}")
    public User unMatchRole(@PathVariable String userId,@PathVariable String roleId) {
        User theActualUser = this.theUserRepository
                .findById(userId)
                .orElse(null);
        Role theActualRole=this.theRoleRepository
                .findById(roleId)
                .orElse(null);

        if (theActualUser != null
                && theActualRole!=null
                && theActualUser.getRole().get_id().equals(roleId)) {
            theActualUser.setRole(null);
            return this.theUserRepository.save(theActualUser);
        } else {
            return null;
        }
    }

    @GetMapping("/errores")
    public User usuarioConMasErrores(){
        User response = null;
        int validaciones = Integer.MIN_VALUE;
        int autorizaciones = Integer.MIN_VALUE;
        int mayor = Integer.MIN_VALUE;

        Statistic theStatistic = null;

        for (User userActual : this.theUserRepository.findAll()){
            theStatistic = theStatisticRepository.getStatisticByIdUser(userActual.get_id());
            validaciones = theStatistic.getNumberErrorsValidation();
            autorizaciones = theStatistic.getNumberErrorsAuthorization();

            if ((validaciones+autorizaciones)>mayor){
                mayor = (validaciones+autorizaciones);
                response = userActual;
            }
        }

        System.out.println(response.getName());
        return response;
    }

    public void fidelidadUsario(User theUser){
        Fidelity fidelidad = new Fidelity();
        fidelidad.setUser(theUser);
        fidelidad.setPoints(20);
        this.theFidelityRepository.save(fidelidad);
    }

    @PutMapping("{id} ")
    public String actualizarFidelidadUsuario(String idUser){
        String respuesta = "";
        Fidelity fidelidad = new Fidelity();
        fidelidad = this.theFidelityRepository.getFidelityByIdUser(idUser);

        if (fidelidad.getPoints() > 0){
            respuesta = "Resto 10 puntos";
            int points = fidelidad.getPoints();
            points = points-10;
            fidelidad.setPoints(points);
            this.theFidelityRepository.save(fidelidad);

        }else {
            respuesta = "No tiene puntos de fidelidad";
        }

        return  respuesta;
    }

    public void updateFidelity(User theUser){
        Fidelity theFidelity = new Fidelity();

        theFidelity = this.theFidelityRepository.getFidelityByIdUser(theUser.get_id());

        if (theFidelity == null){
            Fidelity newFidelity = new Fidelity();
            newFidelity.setUser(theUser);
            newFidelity.setPoints(20);
            this.theFidelityRepository.save(newFidelity);
        }
    }

}
