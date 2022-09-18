package com.hackzurich.liftmeup

import android.os.Bundle
import android.util.Log
import android.util.Log.INFO
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.button.MaterialButton
import com.google.android.material.slider.Slider
import org.json.JSONObject
import org.w3c.dom.Text

class MixerActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mixer)

        val urlBase = "http://172.26.48.1:5000/api/"
        val queue = Volley.newRequestQueue(this)

        val sliderVal = findViewById<Slider>(R.id.slider01)
        findViewById<TextView>(R.id.pace_param).apply {
            text = "0.0 "
        }
        sliderVal.value = 0.0F;
        sliderVal.addOnChangeListener{ _, value, _ ->
            findViewById<TextView>(R.id.pace_param).apply {
                text = "$value "
            }
        }
        val paceButton = findViewById<MaterialButton>(R.id.button_pace)
        paceButton.setOnClickListener { button ->
            val value = findViewById<Slider>(R.id.slider01).value
            val jsonObject = JSONObject("{\"rate\": $value}")
            val jsonPostRequest = JsonObjectRequest(Request.Method.POST, urlBase + "pace", jsonObject,
                { r -> Log.i("INFO:", r.toString())},
                { e -> Log.e("ERROR", e.message.orEmpty()) })
            queue.add(jsonPostRequest)
        }


        findViewById<TextView>(R.id.phaser_param).apply {
            text = "0.0 "
        }

        findViewById<TextView>(R.id.reverb_param).apply {
            text = " 0.0"
        }

        val phaserSlider = findViewById<Slider>(R.id.slider02)
        phaserSlider.value = 2.0F;
        findViewById<TextView>(R.id.phaser_param).apply {
            text = "2.0 "
        }
        phaserSlider.addOnChangeListener{ _, value, _ ->
            findViewById<TextView>(R.id.phaser_param).apply {
                text = "$value "
            }
        }
        val phaserButton = findViewById<MaterialButton>(R.id.button_phaser)
        phaserButton.setOnClickListener { button ->
            val value = findViewById<Slider>(R.id.slider02).value
            val jsonObject = JSONObject("{\"octaves\": $value}")
            val jsonPostRequest = JsonObjectRequest(Request.Method.POST, urlBase + "phaser", jsonObject,
                { r -> Log.i("INFO:", r.toString())},
                { e -> Log.e("ERROR", e.message.orEmpty()) })
            queue.add(jsonPostRequest)
        }


        val reverbSlider = findViewById<Slider>(R.id.slider03)
        reverbSlider.value = 1.0F;
        findViewById<TextView>(R.id.reverb_param).apply {
            text = " 1.0"
        }
        reverbSlider.addOnChangeListener{ _, value, _ ->
            findViewById<TextView>(R.id.reverb_param).apply {
                text = " $value"
            }
        }
        val reverbButton = findViewById<MaterialButton>(R.id.button_reverb)
        reverbButton.setOnClickListener { button ->
            val value = findViewById<Slider>(R.id.slider03).value
            val jsonObject = JSONObject("{\"delay\": $value}")
            val jsonPostRequest = JsonObjectRequest(Request.Method.POST, urlBase + "reverb", jsonObject,
                { r -> Log.i("INFO:", r.toString())},
                { e -> Log.e("ERROR", e.message.orEmpty()) })
            queue.add(jsonPostRequest)
        }

        val airhornButton = findViewById<MaterialButton>(R.id.button_airhorn)
        airhornButton.setOnClickListener { _ ->
            val jsonPostRequest = JsonObjectRequest(Request.Method.POST, urlBase + "airhorn", null,
                { r -> r},
                { e -> Log.e("ERROR", e.message.orEmpty()) })
            queue.add(jsonPostRequest)
        }
    }

}