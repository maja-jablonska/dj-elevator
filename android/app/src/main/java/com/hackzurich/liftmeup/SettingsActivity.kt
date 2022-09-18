package com.hackzurich.liftmeup

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.CheckBox
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [SettingsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class SettingsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_settings)

        val newsSelected = findViewById<CheckBox>(R.id.checkbox_news).apply {
            isChecked = intent.getBooleanExtra("isNewsChecked", true)
        }
        val djSelected = findViewById<CheckBox>(R.id.checkbox_dj).apply {
            isChecked = intent.getBooleanExtra("isDJChecked", true)
        }
        val geoSelected = findViewById<CheckBox>(R.id.checkbox_geo).apply {
            isChecked = intent.getBooleanExtra("isGeoChecked", true)
        }

        val button: Button = findViewById<Button>(R.id.save_button)
        button.setOnClickListener {
            val newsCheckBox: CheckBox = findViewById(R.id.checkbox_news)
            val djCheckBox: CheckBox = findViewById(R.id.checkbox_dj)
            val geoCheckBox: CheckBox = findViewById(R.id.checkbox_geo)

            val intent = Intent(this, MainActivity::class.java).apply {
                putExtra("isNewsChecked", newsCheckBox.isChecked)
                putExtra("isDJChecked", djCheckBox.isChecked)
                putExtra("isGeoChecked", geoCheckBox.isChecked)
            }
            startActivity(intent)
        };
    }
}